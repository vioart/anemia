const { db, auth } = require('../config/firebase');

const dataController = {
    createPregnantMother: async (request, h) => {
        try {
            const {
            user_id,
            nama,
            usia,
            hari_pertama_haid,
            tempat_tinggal,
            tempat_periksa_kecamatan,
            pendidikan_terakhir,
            pekerjaan,
            nama_suami,
            no_hp_suami,
            kode_istri,
            } = request.payload;
    
            if (!nama) {
            const response = h.response({
                status: 'fail',
                message: 'Failed to add pregnant mother data. Please provide the pregnant mother name.',
            });
            response.code(400);
            return response;
            }

            // Buat objek newItem yang berisi data ibu hamil
            const newItem = {
                user_id,
                nama,
                usia,
                hari_pertama_haid,
                tempat_tinggal,
                tempat_periksa_kecamatan,
                pendidikan_terakhir,
                pekerjaan,
                nama_suami,
                no_hp_suami,
                kode_istri,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            try {
                // Simpan data ke Firestore
                const docRef = db.collection('Pregnant_Mother').doc(); // Buat dokumen baru dengan ID otomatis
                await docRef.set(newItem);
                
                // Format respons sesuai permintaan
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

    getPregnantMother: async (request, h) => {
        try {
            const { id } = request.params;

            // Ambil data dari Firestore berdasarkan ID
            const docRef = db.collection('Pregnant_Mother').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Pregnant mother not found' }).code(404);
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

    getAllPregnantMother: async (request, h) => {
        try {
            const snapshot = await db.collection('Pregnant_Mother').get();
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

    updatePregnantMother: async (request, h) => {
        try {
            const { id } = request.params;
            const {
                user_id,
                nama,
                usia,
                hari_pertama_haid,
                tempat_tinggal,
                tempat_periksa_kecamatan,
                pendidikan_terakhir,
                pekerjaan,
                nama_suami,
                no_hp_suami,
                kode_istri,
            } = request.payload;

            // Buat objek updatedItem yang berisi data yang diperbarui
            const updatedItem = {
                user_id,
                nama,
                usia,
                hari_pertama_haid,
                tempat_tinggal,
                tempat_periksa_kecamatan,
                pendidikan_terakhir,
                pekerjaan,
                nama_suami,
                no_hp_suami,
                kode_istri,
                updated_at: new Date().toISOString()
            };

            // Hapus properti yang tidak diberikan dalam payload
            Object.keys(updatedItem).forEach(key => {
                if (updatedItem[key] === undefined) {
                    delete updatedItem[key];
                }
            });

            try {
                // Perbarui data di Firestore
                const docRef = db.collection('Pregnant_Mother').doc(id);
                await docRef.update(updatedItem);

                // Ambil dokumen yang diperbarui untuk respons
                const updatedDoc = await docRef.get();

                if (!updatedDoc.exists) {
                    return h.response({ status: 'fail', message: 'Pregnant mother not found' }).code(404);
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

    deletePregnantMother: async (request, h) => {
        try {
            const { id } = request.params;

            // Hapus dokumen dari Firestore berdasarkan ID
            const docRef = db.collection('Pregnant_Mother').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Pregnant mother not found' }).code(404);
            }

            await docRef.delete();

            return h.response({ status: 'success', message: 'Pregnant mother data deleted successfully' }).code(200);
        } catch (error) {
            console.error('Error deleting document:', error);
            return h.response({ status: 'fail', message: 'Error deleting document' }).code(500);
        }
    },

    // Anemia Risk Calculator
    createCalculatorAnemia: async (request, h) => {
        try {
            const {
            ibu_hamil_id,
            usia_kehamilan,
            jumlah_anak,
            riwayat_anemia,
            konsumsi_ttd_7hari,
            hasil_hb,
            resiko_anemia,
            tanggal_perhitungan
            } = request.payload;
    
            if (!ibu_hamil_id) {
            const response = h.response({
                status: 'fail',
                message: 'Failed to add calculator data. Please provide the calculator data id.',
            });
            response.code(400);
            return response;
            }

            // Buat objek newItem yang berisi data ibu hamil
            const newItem = {
                ibu_hamil_id,
                usia_kehamilan,
                jumlah_anak,
                riwayat_anemia,
                konsumsi_ttd_7hari,
                hasil_hb,
                resiko_anemia,
                tanggal_perhitungan,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            try {
                // Simpan data ke Firestore
                const docRef = db.collection('Anemia_Risk_Calculator').doc(); // Buat dokumen baru dengan ID otomatis
                await docRef.set(newItem);
                
                // Format respons sesuai permintaan
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

    getCalculatorAnemia: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Anemia_Risk_Calculator').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Anemia risk calculator not found' }).code(404);
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

    getAllCalculatorAnemia: async (request, h) => {
        try {
            const snapshot = await db.collection('Anemia_Risk_Calculator').get();
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

    updateCalculatorAnemia: async (request, h) => {
        try {
            const { id } = request.params;
            const {
                ibu_hamil_id,
                usia_kehamilan,
                jumlah_anak,
                riwayat_anemia,
                konsumsi_ttd_7hari,
                hasil_hb,
                resiko_anemia,
                tanggal_perhitungan
            } = request.payload;

            // Buat objek updatedItem yang berisi data yang diperbarui
            const updatedItem = {
                ibu_hamil_id,
                usia_kehamilan,
                jumlah_anak,
                riwayat_anemia,
                konsumsi_ttd_7hari,
                hasil_hb,
                resiko_anemia,
                tanggal_perhitungan,
                updated_at: new Date().toISOString()
            };

            Object.keys(updatedItem).forEach(key => {
                if (updatedItem[key] === undefined) {
                    delete updatedItem[key];
                }
            });

            try {
                const docRef = db.collection('Anemia_Risk_Calculator').doc(id);
                await docRef.update(updatedItem);

                const updatedDoc = await docRef.get();

                if (!updatedDoc.exists) {
                    return h.response({ status: 'fail', message: 'Calculator data not found' }).code(404);
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

    deleteCalculatorAnemia: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Anemia_Risk_Calculator').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Calculator data not found' }).code(404);
            }

            await docRef.delete();

            return h.response({ status: 'success', message: 'Calculator data deleted successfully' }).code(200);
        } catch (error) {
            console.error('Error deleting document:', error);
            return h.response({ status: 'fail', message: 'Error deleting document' }).code(500);
        }
    },
    
    // Eating Journal
    createEatingJournal: async (request, h) => {
        try {
            const {
                ibu_hamil_id,
                tanggal,
                sarapan_karbohidrat,
                sarapan_hewani,
                sarapan_nabati,
                sarapan_sayur,
                sarapan_buah,
                makan_siang_karbohidrat,
                makan_siang_lauk_hewani,
                makan_siang_lauk_nabati,
                makan_siang_sayur,
                makan_siang_buah,
                makan_malam_karbohidrat,
                makan_malam_lauk_hewani,
                makan_malam_lauk_nabati,
                makan_malam_sayur,
                makan_malam_buah,
                total_nilai_gizi,
            } = request.payload;
    
            if (!ibu_hamil_id) {
            const response = h.response({
                status: 'fail',
                message: 'Failed to add eating journal data. Please provide the eating journal id.',
            });
            response.code(400);
            return response;
            }

            const newItem = {
                ibu_hamil_id,
                tanggal,
                sarapan_karbohidrat,
                sarapan_hewani,
                sarapan_nabati,
                sarapan_sayur,
                sarapan_buah,
                makan_siang_karbohidrat,
                makan_siang_lauk_hewani,
                makan_siang_lauk_nabati,
                makan_siang_sayur,
                makan_siang_buah,
                makan_malam_karbohidrat,
                makan_malam_lauk_hewani,
                makan_malam_lauk_nabati,
                makan_malam_sayur,
                makan_malam_buah,
                total_nilai_gizi,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            try {
                // Simpan data ke Firestore
                const docRef = db.collection('Eating_Journal').doc(); // Buat dokumen baru dengan ID otomatis
                await docRef.set(newItem);
                
                // Format respons sesuai permintaan
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
    
    getEatingJournal: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Eating_Journal').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Eating journal not found' }).code(404);
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

    getAllEatingJournal: async (request, h) => {
        try {
            const snapshot = await db.collection('Eating_Journal').get();
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

    updateEatingJournal: async (request, h) => {
        try {
            const { id } = request.params;
            const {
                ibu_hamil_id,
                tanggal,
                sarapan_karbohidrat,
                sarapan_hewani,
                sarapan_nabati,
                sarapan_sayur,
                sarapan_buah,
                makan_siang_karbohidrat,
                makan_siang_lauk_hewani,
                makan_siang_lauk_nabati,
                makan_siang_sayur,
                makan_siang_buah,
                makan_malam_karbohidrat,
                makan_malam_lauk_hewani,
                makan_malam_lauk_nabati,
                makan_malam_sayur,
                makan_malam_buah,
                total_nilai_gizi,
            } = request.payload;

            // Buat objek updatedItem yang berisi data yang diperbarui
            const updatedItem = {
                ibu_hamil_id,
                tanggal,
                sarapan_karbohidrat,
                sarapan_hewani,
                sarapan_nabati,
                sarapan_sayur,
                sarapan_buah,
                makan_siang_karbohidrat,
                makan_siang_lauk_hewani,
                makan_siang_lauk_nabati,
                makan_siang_sayur,
                makan_siang_buah,
                makan_malam_karbohidrat,
                makan_malam_lauk_hewani,
                makan_malam_lauk_nabati,
                makan_malam_sayur,
                makan_malam_buah,
                total_nilai_gizi,
                updated_at: new Date().toISOString()
            };

            Object.keys(updatedItem).forEach(key => {
                if (updatedItem[key] === undefined) {
                    delete updatedItem[key];
                }
            });

            try {
                const docRef = db.collection('Eating_Journal').doc(id);
                await docRef.update(updatedItem);

                const updatedDoc = await docRef.get();

                if (!updatedDoc.exists) {
                    return h.response({ status: 'fail', message: 'Eating journal not found' }).code(404);
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

    deleteEatingJournal: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Eating_Journal').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Eating journal not found' }).code(404);
            }

            await docRef.delete();

            return h.response({ status: 'success', message: 'Eating journal deleted successfully' }).code(200);
        } catch (error) {
            console.error('Error deleting document:', error);
            return h.response({ status: 'fail', message: 'Error deleting document' }).code(500);
        }
    },

    // Reminder TTD
    createReminderTtd: async (request, h) => {
        try {
            const {
                ibu_hamil_id,
                waktu_pagi,
                waktu_sore,
                frekuensi,
            } = request.payload;
    
            if (!ibu_hamil_id) {
            const response = h.response({
                status: 'fail',
                message: 'Failed to add reminder ttd data. Please provide the reminder ttd id.',
            });
            response.code(400);
            return response;
            }

            const newItem = {
                ibu_hamil_id,
                waktu_pagi,
                waktu_sore,
                frekuensi,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            try {
                const docRef = db.collection('Reminder_Ttd').doc();
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
    
    getReminderTtd: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Reminder_Ttd').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Reminder ttd not found' }).code(404);
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

    getAllReminderTtd: async (request, h) => {
        try {
            const snapshot = await db.collection('Reminder_Ttd').get();
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

    updateReminderTtd: async (request, h) => {
        try {
            const { id } = request.params;
            const {
                ibu_hamil_id,
                waktu_pagi,
                waktu_sore,
                frekuensi,
            } = request.payload;

            // Buat objek updatedItem yang berisi data yang diperbarui
            const updatedItem = {
                ibu_hamil_id,
                waktu_pagi,
                waktu_sore,
                frekuensi,
                updated_at: new Date().toISOString()
            };

            Object.keys(updatedItem).forEach(key => {
                if (updatedItem[key] === undefined) {
                    delete updatedItem[key];
                }
            });

            try {
                const docRef = db.collection('Reminder_Ttd').doc(id);
                await docRef.update(updatedItem);

                const updatedDoc = await docRef.get();

                if (!updatedDoc.exists) {
                    return h.response({ status: 'fail', message: 'Reminder TTD not found' }).code(404);
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

    deleteReminderTtd: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Reminder_Ttd').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Reminder TTD not found' }).code(404);
            }

            await docRef.delete();

            return h.response({ status: 'success', message: 'Reminder TTD deleted successfully' }).code(200);
        } catch (error) {
            console.error('Error deleting document:', error);
            return h.response({ status: 'fail', message: 'Error deleting document' }).code(500);
        }
    },

};

module.exports = dataController;