const Joi = require('joi');
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');
const husbandController = require('../controllers/husbandController');
const healthCenterController = require('../controllers/healthCenterController');


const apiRoutes = [
    // Information API
    {
        method: 'GET', 
        path: '/',
        handler: async (request, h) => {
            try {
                const welcomeMessage = 'Welcome to our Anemia API!';
                return h.response({ status: 'success', message: welcomeMessage}).code(200);
            } catch (error) {
                return h.response({ error: 'Failed to retrive homepage.'}.code(500));
            }
        },
    },
    {
        method: 'GET', 
        path: '/api/v1',
        handler: async (request, h) => {
            try {
                const apiInfo = {
                    name: 'Anemia API',
                    version: '1.0.0',
                    description:
                        "A RESTful API for managing anemia risk calculator data, meal journals, iron supplement reminders, and iron supplement consumption provides endpoints for creating, updating, deleting, and managing data of pregnant women, husbands, and healthcare workers."
                };
                return h.response(apiInfo).code(200);
            } catch (error) {
                return h.response({ error: 'Failed to retrieve API information.' }).code(500);
            }
        },
    },
    // Authentification Account
    {
        method: 'POST',
        path: '/signup',
        options: {
          payload: {
            multipart: true,
          },
          validate: {
            // payload: Joi.object({
            //   email: Joi.string().allow('').label('email'),
            //   username: Joi.string().allow('').label('username'),
            //   password: Joi.string().allow('').label('password'),
            // }),
            payload: Joi.object({
                idToken: Joi.string().required(), // Token ID dari Google
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
        },
        handler: authController.signup,
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            validate: {
              payload: Joi.object({
                idToken: Joi.string().required(), // Token ID dari Google
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: authController.login,
    },
    {
        method: 'GET',
        path: '/verify-token',
        handler: authController.verifyToken,
    },
    // Data Pregnant Mother
    {
        method: 'GET',
        path: '/mother',
        handler: dataController.getAllPregnantMother,
    },
    {
        method: 'GET',
        path: '/mother/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: dataController.getPregnantMother,
    },
    {
        method: 'POST',
        path: '/mother',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                user_id: Joi.string().allow('').label('user_id'),
                nama: Joi.string().allow('').label('nama'),
                usia: Joi.string().allow('').label('usia'),
                hari_pertama_haid: Joi.string().allow('').label('hari_pertama_haid'),
                tempat_tinggal: Joi.string().allow('').label('tempat_tinggal'),
                tempat_periksa_kecamatan: Joi.string().allow('').label('tempat_periksa_kecamatan'),
                pendidikan_terakhir: Joi.string().allow('').label('pendidikan_terakhir'),
                pekerjaan: Joi.string().allow('').label('pekerjaan'),
                nama_suami: Joi.string().allow('').label('nama_suami'),
                no_hp_suami: Joi.string().allow('').label('no_hp_suami'),
                kode_istri: Joi.string().allow('').label('kode_istri'),
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: dataController.createPregnantMother,
    },
    {
        method: 'PUT',
        path: '/mother/{id}',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                user_id: Joi.string().allow('').label('user_id'),
                nama: Joi.string().allow('').label('nama'),
                usia: Joi.string().allow('').label('usia'),
                hari_pertama_haid: Joi.string().allow('').label('hari_pertama_haid'),
                tempat_tinggal: Joi.string().allow('').label('tempat_tinggal'),
                tempat_periksa_kecamatan: Joi.string().allow('').label('tempat_periksa_kecamatan'),
                pendidikan_terakhir: Joi.string().allow('').label('pendidikan_terakhir'),
                pekerjaan: Joi.string().allow('').label('pekerjaan'),
                nama_suami: Joi.string().allow('').label('nama_suami'),
                no_hp_suami: Joi.string().allow('').label('no_hp_suami'),
                kode_istri: Joi.string().allow('').label('kode_istri'),
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: dataController.updatePregnantMother
    },
    {
        method: 'DELETE',
        path: '/mother/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: dataController.deletePregnantMother

    },
    // Data Calculator Anemia
    {
        method: 'GET',
        path: '/calculator-anemia',
        handler: dataController.getAllCalculatorAnemia,
    },
    {
        method: 'GET',
        path: '/calculator-anemia/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: dataController.getCalculatorAnemia,
    },
    {
        method: 'POST',
        path: '/calculator-anemia',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                ibu_hamil_id: Joi.string().allow('').label('ibu_hamil_id'),
                usia_kehamilan: Joi.string().allow('').label('usia_kehamilan'),
                jumlah_anak: Joi.string().allow('').label('jumlah_anak'),
                riwayat_anemia: Joi.string().allow('').label('riwayat_anemia'),
                konsumsi_ttd_7hari: Joi.string().allow('').label('konsumsi_ttd_7hari'),
                hasil_hb: Joi.string().allow('').label('hasil_hb'),
                resiko_anemia: Joi.string().allow('').label('resiko_anemia'),
                tanggal_perhitungan: Joi.string().allow('').label('tanggal_perhitungan'),
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: dataController.createCalculatorAnemia,
    },
    {
      method: 'PUT',
      path: '/calculator-anemia/{id}',
      options: {
          payload: {
            multipart: true,
          },
          validate: {
            payload: Joi.object({
              ibu_hamil_id: Joi.string().allow('').label('ibu_hamil_id'),
              usia_kehamilan: Joi.string().allow('').label('usia_kehamilan'),
              jumlah_anak: Joi.string().allow('').label('jumlah_anak'),
              riwayat_anemia: Joi.string().allow('').label('riwayat_anemia'),
              konsumsi_ttd_7hari: Joi.string().allow('').label('konsumsi_ttd_7hari'),
              hasil_hb: Joi.string().allow('').label('hasil_hb'),
              resiko_anemia: Joi.string().allow('').label('resiko_anemia'),
              tanggal_perhitungan: Joi.string().allow('').label('tanggal_perhitungan'),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
      },
      handler: dataController.updateCalculatorAnemia,
    },
    {
      method: 'DELETE',
      path: '/calculator-anemia/{id}',
      options: {
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }),
          },
      },
      handler: dataController.deleteCalculatorAnemia,
    },

    // Data Eating Journal
    {
        method: 'GET',
        path: '/eating-journal',
        handler: dataController.getAllEatingJournal,
    },
    {
        method: 'GET',
        path: '/eating-journal/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: dataController.getEatingJournal,
    },
    {
        method: 'POST',
        path: '/eating-journal',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                ibu_hamil_id: Joi.string().allow('').label('ibu_hamil_id'),
                tanggal: Joi.string().allow('').label('tanggal'),
                sarapan_karbohidrat: Joi.string().allow('').label('sarapan_karbohidrat'),
                sarapan_hewani: Joi.string().allow('').label('sarapan_hewani'),
                sarapan_nabati: Joi.string().allow('').label('sarapan_nabati'),
                sarapan_sayur: Joi.string().allow('').label('sarapan_sayur'),
                sarapan_buah: Joi.string().allow('').label('sarapan_buah'),
                makan_siang_karbohidrat: Joi.string().allow('').label('makan_siang_karbohidrat'),
                makan_siang_lauk_hewani: Joi.string().allow('').label('makan_siang_lauk_hewani'),
                makan_siang_lauk_nabati: Joi.string().allow('').label('makan_siang_lauk_nabati'),
                makan_siang_sayur: Joi.string().allow('').label('makan_siang_sayur'),
                makan_siang_buah: Joi.string().allow('').label('makan_siang_buah'),
                makan_malam_karbohidrat: Joi.string().allow('').label('makan_malam_karbohidrat'),
                makan_malam_lauk_hewani: Joi.string().allow('').label('makan_malam_lauk_hewani'),
                makan_malam_lauk_nabati: Joi.string().allow('').label('makan_malam_lauk_nabati'),
                makan_malam_sayur: Joi.string().allow('').label('makan_malam_sayur'),
                makan_malam_buah: Joi.string().allow('').label('makan_malam_buah'),
                total_nilai_gizi: Joi.string().allow('').label('total_nilai_gizi'),
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: dataController.createEatingJournal,
    },
    {
      method: 'PUT',
      path: '/eating-journal/{id}',
      options: {
          payload: {
            multipart: true,
          },
          validate: {
            payload: Joi.object({
              ibu_hamil_id: Joi.string().allow('').label('ibu_hamil_id'),
              tanggal: Joi.string().allow('').label('tanggal'),
              sarapan_karbohidrat: Joi.string().allow('').label('sarapan_karbohidrat'),
              sarapan_hewani: Joi.string().allow('').label('sarapan_hewani'),
              sarapan_nabati: Joi.string().allow('').label('sarapan_nabati'),
              sarapan_sayur: Joi.string().allow('').label('sarapan_sayur'),
              sarapan_buah: Joi.string().allow('').label('sarapan_buah'),
              makan_siang_karbohidrat: Joi.string().allow('').label('makan_siang_karbohidrat'),
              makan_siang_lauk_hewani: Joi.string().allow('').label('makan_siang_lauk_hewani'),
              makan_siang_lauk_nabati: Joi.string().allow('').label('makan_siang_lauk_nabati'),
              makan_siang_sayur: Joi.string().allow('').label('makan_siang_sayur'),
              makan_siang_buah: Joi.string().allow('').label('makan_siang_buah'),
              makan_malam_karbohidrat: Joi.string().allow('').label('makan_malam_karbohidrat'),
              makan_malam_lauk_hewani: Joi.string().allow('').label('makan_malam_lauk_hewani'),
              makan_malam_lauk_nabati: Joi.string().allow('').label('makan_malam_lauk_nabati'),
              makan_malam_sayur: Joi.string().allow('').label('makan_malam_sayur'),
              makan_malam_buah: Joi.string().allow('').label('makan_malam_buah'),
              total_nilai_gizi: Joi.string().allow('').label('total_nilai_gizi'),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
      },
      handler: dataController.updateEatingJournal,
    },
    {
      method: 'DELETE',
      path: '/eating-journal/{id}',
      options: {
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }),
          },
      },
      handler: dataController.deleteEatingJournal,
    },

    // Data Reminder TTD
    {
        method: 'GET',
        path: '/reminder-ttd',
        handler: dataController.getAllReminderTtd,
    },
    {
        method: 'GET',
        path: '/reminder-ttd/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: dataController.getReminderTtd,
    },
    {
        method: 'POST',
        path: '/reminder-ttd',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                ibu_hamil_id: Joi.string().allow('').label('ibu_hamil_id'),
                waktu_pagi: Joi.string().allow('').label('waktu_pagi'),
                waktu_sore: Joi.string().allow('').label('waktu_sore'),
                frekuensi: Joi.string().allow('').label('frekuensi'),
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: dataController.createReminderTtd,
    },
    {
      method: 'PUT',
      path: '/reminder-ttd/{id}',
      options: {
          payload: {
            multipart: true,
          },
          validate: {
            payload: Joi.object({
              ibu_hamil_id: Joi.string().allow('').label('ibu_hamil_id'),
              waktu_pagi: Joi.string().allow('').label('waktu_pagi'),
              waktu_sore: Joi.string().allow('').label('waktu_sore'),
              frekuensi: Joi.string().allow('').label('frekuensi'),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
      },
      handler: dataController.updateReminderTtd,
    },
    {
      method: 'DELETE',
      path: '/reminder-ttd/{id}',
      options: {
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }),
          },
      },
      handler: dataController.deleteReminderTtd,
    },

    // Consumption TTD
    {
        method: 'GET',
        path: '/consumption-ttd',
        handler: dataController.getAllConsumptionTtd,
    },
    {
        method: 'GET',
        path: '/consumption-ttd/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: dataController.getConsumptionTtd,
    },
    {
        method: 'POST',
        path: '/consumption-ttd',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                ibu_hamil_id: Joi.string().allow('').label('ibu_hamil_id'),
                tanggal: Joi.string().allow('').label('tanggal'),
                waktu: Joi.string().allow('').label('waktu'),
                status: Joi.string().allow('').label('status'),
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: dataController.createConsumptionTtd,
    },
    {
      method: 'PUT',
      path: '/consumption-ttd/{id}',
      options: {
          payload: {
            multipart: true,
          },
          validate: {
            payload: Joi.object({
              ibu_hamil_id: Joi.string().allow('').label('ibu_hamil_id'),
              tanggal: Joi.string().allow('').label('tanggal'),
              waktu: Joi.string().allow('').label('waktu'),
              status: Joi.string().allow('').label('status'),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
      },
      handler: dataController.updateConsumptionTtd,
    },
    {
      method: 'DELETE',
      path: '/consumption-ttd/{id}',
      options: {
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }),
          },
      },
      handler: dataController.deleteConsumptionTtd,
    },

    // Data Husband
    {
        method: 'GET',
        path: '/husband',
        handler: husbandController.getAllHusband,
    },
    {
        method: 'GET',
        path: '/husband/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: husbandController.getHusband,
    },
    {
        method: 'POST',
        path: '/husband',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                user_id: Joi.string().allow('').label('user_id'),
                kode_istri: Joi.string().allow('').label('kode_istri'),
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: husbandController.createHusband,
    },
    {
      method: 'PUT',
      path: '/husband/{id}',
      options: {
          payload: {
            multipart: true,
          },
          validate: {
            payload: Joi.object({
              user_id: Joi.string().allow('').label('user_id'),
              kode_istri: Joi.string().allow('').label('kode_istri'),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
      },
      handler: husbandController.updateHusband,
    },
    {
      method: 'DELETE',
      path: '/husband/{id}',
      options: {
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }),
          },
      },
      handler: husbandController.deleteHusband,
    },

    // Data Puskesmas Officer
    {
        method: 'GET',
        path: '/puskesmas-officer',
        handler: healthCenterController.getAllOfficer,
    },
    {
        method: 'GET',
        path: '/puskesmas-officer/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: healthCenterController.getOfficer,
    },
    {
        method: 'POST',
        path: '/puskesmas-officer',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                  user_id: Joi.string().allow('').label('user_id'),
                  puskesmas_id: Joi.string().allow('').label('puskesmas_id'),
                  nama: Joi.string().allow('').label('nama'),
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: healthCenterController.createOfficer,
    },
    {
      method: 'PUT',
      path: '/puskesmas-officer/{id}',
      options: {
          payload: {
            multipart: true,
          },
          validate: {
            payload: Joi.object({
              user_id: Joi.string().allow('').label('user_id'),
              puskesmas_id: Joi.string().allow('').label('puskesmas_id'),
              nama: Joi.string().allow('').label('nama'),
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
      },
      handler: healthCenterController.updateOfficer,
    },
    {
      method: 'DELETE',
      path: '/puskesmas-officer/{id}',
      options: {
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }),
          },
      },
      handler: healthCenterController.deleteOfficer,
    },

    // Data Puskesmas 
    {
        method: 'GET',
        path: '/puskesmas',
        handler: healthCenterController.getAllPuskesmas,
    },
    {
        method: 'GET',
        path: '/puskesmas/{id}',
        options: {
            validate: {
              params: Joi.object({
                id: Joi.string().required(),
              }),
            },
        },
        handler: healthCenterController.getPuskesmas,
    },
    {
        method: 'POST',
        path: '/puskesmas',
        options: {
            payload: {
              multipart: true,
            },
            validate: {
              payload: Joi.object({
                nama: Joi.string().allow('').label('nama'),
                kecamatan: Joi.string().allow('').label('kecamatan')
              }),
              failAction: async (request, h, err) => {
                throw err;
              },
            },
        },
        handler: healthCenterController.createPuskesmas,
    },
    {
      method: 'PUT',
      path: '/puskesmas/{id}',
      options: {
          payload: {
            multipart: true,
          },
          validate: {
            payload: Joi.object({
              nama: Joi.string().allow('').label('nama'),
              kecamatan: Joi.string().allow('').label('kecamatan')
            }),
            failAction: async (request, h, err) => {
              throw err;
            },
          },
      },
      handler: healthCenterController.updatePuskesmas,
    },
    {
      method: 'DELETE',
      path: '/puskesmas/{id}',
      options: {
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }),
          },
      },
      handler: healthCenterController.deletePuskesmas,
    },
];

module.exports = apiRoutes;