const { db, auth } = require('../config/firebase');

const healthCenterController = {
    // Petugas Puskesmas
    createOfficer: async (request, h) => {
        try {
            const {
                user_id,
                puskesmas_id,
                nama,
            } = request.payload;
    
            if (!puskesmas_id) {
            const response = h.response({
                status: 'fail',
                message: 'Failed to add puskesmas officer data. Please provide the puskesmas officer data id.',
            });
            response.code(400);
            return response;
            }

            const newItem = {
                user_id,
                puskesmas_id,
                nama,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            try {
                const docRef = db.collection('Puskesmas_Officer').doc();
                await docRef.set(newItem);
                
                const responsePayload = {
                    status: 'success',
                    data: {
                        id: docRef.id,
                        ...newItem
                    }
                };

                return h.response(responsePayload).code(201);
            } catch (error) {
                console.error('Error adding document:', error);
                return h.response({ status: 'fail', message: 'Error adding document' }).code(500);
            }
        } catch (error) {
            console.error('Error during request handling:', error);
            return h.response({ status: 'fail', message: error.message }).code(500);
        }
    },
    
    getOfficer: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Puskesmas_Officer').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Officer not found' }).code(404);
            }

            const responsePayload = {
                status: 'success',
                data: {
                    id: doc.id,
                    ...doc.data()
                }
            };

            return h.response(responsePayload).code(200);
        } catch (error) {
            console.error('Error fetching document:', error);
            return h.response({ status: 'fail', message: 'Error fetching document' }).code(500);
        }
    },

    getAllOfficer: async (request, h) => {
        try {
            const snapshot = await db.collection('Puskesmas_Officer').get();
            const mothers = [];
            snapshot.forEach(doc => {
                mothers.push({ id: doc.id, ...doc.data() });
            });

            return h.response({ status: 'success', data: mothers }).code(200);
        } catch (error) {
            console.error('Error fetching documents:', error);
            return h.response({ status: 'fail', message: 'Error fetching documents' }).code(500);
        }
    },

    updateOfficer: async (request, h) => {
        try {
            const { id } = request.params;
            const {
                user_id,
                puskesmas_id,
                nama,
            } = request.payload;

            const updatedItem = {
                user_id,
                puskesmas_id,
                nama,
                updated_at: new Date().toISOString()
            };

            Object.keys(updatedItem).forEach(key => {
                if (updatedItem[key] === undefined) {
                    delete updatedItem[key];
                }
            });

            try {
                const docRef = db.collection('Puskermas_Officer').doc(id);
                await docRef.update(updatedItem);

                const updatedDoc = await docRef.get();

                if (!updatedDoc.exists) {
                    return h.response({ status: 'fail', message: 'Officer not found' }).code(404);
                }

                const responsePayload = {
                    status: 'success',
                    data: {
                        id: updatedDoc.id,
                        ...updatedDoc.data()
                    }
                };

                return h.response(responsePayload).code(200);
            } catch (error) {
                console.error('Error updating document:', error);
                return h.response({ status: 'fail', message: 'Error updating document' }).code(500);
            }
        } catch (error) {
            console.error('Error during request handling:', error);
            return h.response({ status: 'fail', message: error.message }).code(500);
        }
    },

    deleteOfficer: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Puskesmas_Officer').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Officer not found' }).code(404);
            }

            await docRef.delete();

            return h.response({ status: 'success', message: 'Husband deleted successfully' }).code(200);
        } catch (error) {
            console.error('Error deleting document:', error);
            return h.response({ status: 'fail', message: 'Error deleting document' }).code(500);
        }
    },

    // Puskesmas
    createPuskesmas: async (request, h) => {
        try {
            const {
                nama,
                kecamatan,
            } = request.payload;
    
            if (!nama) {
            const response = h.response({
                status: 'fail',
                message: 'Failed to add puskesmas data. Please provide the puskesmas data id.',
            });
            response.code(400);
            return response;
            }

            const newItem = {
                nama,
                kecamatan,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            try {
                const docRef = db.collection('Puskesmas').doc();
                await docRef.set(newItem);
                
                const responsePayload = {
                    status: 'success',
                    data: {
                        id: docRef.id,
                        ...newItem
                    }
                };

                return h.response(responsePayload).code(201);
            } catch (error) {
                console.error('Error adding document:', error);
                return h.response({ status: 'fail', message: 'Error adding document' }).code(500);
            }
        } catch (error) {
            console.error('Error during request handling:', error);
            return h.response({ status: 'fail', message: error.message }).code(500);
        }
    },
    
    getPuskesmas: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Puskesmas').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Puskesmas not found' }).code(404);
            }

            const responsePayload = {
                status: 'success',
                data: {
                    id: doc.id,
                    ...doc.data()
                }
            };

            return h.response(responsePayload).code(200);
        } catch (error) {
            console.error('Error fetching document:', error);
            return h.response({ status: 'fail', message: 'Error fetching document' }).code(500);
        }
    },

    getAllPuskesmas: async (request, h) => {
        try {
            const snapshot = await db.collection('Puskesmas').get();
            const puskesmas = [];
            snapshot.forEach(doc => {
                puskesmas.push({ id: doc.id, ...doc.data() });
            });

            return h.response({ status: 'success', data: puskesmas }).code(200);
        } catch (error) {
            console.error('Error fetching documents:', error);
            return h.response({ status: 'fail', message: 'Error fetching documents' }).code(500);
        }
    },

    updatePuskesmas: async (request, h) => {
        try {
            const { id } = request.params;
            const {
                nama,
                kecamatan,
            } = request.payload;

            const updatedItem = {
                nama,
                kecamatan,
                updated_at: new Date().toISOString()
            };

            Object.keys(updatedItem).forEach(key => {
                if (updatedItem[key] === undefined) {
                    delete updatedItem[key];
                }
            });

            try {
                const docRef = db.collection('Puskermas').doc(id);
                await docRef.update(updatedItem);

                const updatedDoc = await docRef.get();

                if (!updatedDoc.exists) {
                    return h.response({ status: 'fail', message: 'Puskesmas not found' }).code(404);
                }

                const responsePayload = {
                    status: 'success',
                    data: {
                        id: updatedDoc.id,
                        ...updatedDoc.data()
                    }
                };

                return h.response(responsePayload).code(200);
            } catch (error) {
                console.error('Error updating document:', error);
                return h.response({ status: 'fail', message: 'Error updating document' }).code(500);
            }
        } catch (error) {
            console.error('Error during request handling:', error);
            return h.response({ status: 'fail', message: error.message }).code(500);
        }
    },

    deletePuskesmas: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Puskesmas').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Puskesmas not found' }).code(404);
            }

            await docRef.delete();

            return h.response({ status: 'success', message: 'Puskesmas deleted successfully' }).code(200);
        } catch (error) {
            console.error('Error deleting document:', error);
            return h.response({ status: 'fail', message: 'Error deleting document' }).code(500);
        }
    },

};


module.exports = healthCenterController;