const bcrypt = require('bcryptjs');
const { db, auth } = require('../config/firebase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '19da8c169b305ae48b8e99efd547c808cdc1ce321eaaf723d55a150997a40d60dc8337b0613d5f6071c47740171bd6a4160e665c747fd855ed983864a07e1a0b'; // Gantilah dengan secret key yang kuat dan aman

const authController = {
  signup: async (request, h) => {
    const { idToken } = request.payload;

    try {
      // Verifikasi token ID Google
      const decodedToken = await auth.verifyIdToken(idToken);
      const { uid, email, name } = decodedToken;

      // Cek apakah email sudah terdaftar di Firebase Authentication
      let userRecord;
      try {
        userRecord = await auth.getUser(uid);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          userRecord = null;
        } else {
          throw error;
        }
      }

      if (userRecord) {
        return h.response({ status: 'success', userId: uid }).code(200);
      }

      // Jika pengguna belum terdaftar, buat pengguna baru di Firebase Authentication
      const newUserRecord = await auth.createUser({
        uid,
        email,
        displayName: name,
        emailVerified: true, // Biasanya di-set ke true jika verifikasi email dilakukan di sisi klien
      });

      return h.response({ status: 'success', userId: newUserRecord.uid }).code(201);
    } catch (error) {
      console.error('Error during Google signup:', error);
      return h.response({ status: 'fail', message: 'Failed to sign up with Google' }).code(500);
    }
  },

  login: async (request, h) => {
    const { idToken } = request.payload;

    try {
      // Verifikasi token ID Google
      const decodedToken = await auth.verifyIdToken(idToken);
      const { uid, email } = decodedToken;

      // Generate JWT token untuk penggunaan di server-side
      const token = jwt.sign({ userId: uid, email }, JWT_SECRET, { expiresIn: '1h' });

      return h.response({ status: 'success', token }).code(200);
    } catch (error) {
      console.error('Error during login:', error);
      return h.response({ status: 'fail', message: 'Invalid credentials' }).code(401);
    }
  },

  verifyToken: async (request, h) => {
    const { token } = request.headers;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return h.response({ status: 'success', user: decoded }).code(200);
    } catch (error) {
      return h.response({ status: 'fail', message: 'Invalid token' }).code(401);
    }
  },
};

module.exports = authController;
