const { db, auth } = require('../config/firebase');

const husbandController = {
    // Konsumsi TTD
    createHusband: async (request, h) => {
        try {
            const {
                user_id,
                kode_istri,
            } = request.payload;
    
            if (!ibu_hamil_id) {
            const response = h.response({
                status: 'fail',
                message: 'Failed to add husband data. Please provide the husband data id.',
            });
            response.code(400);
            return response;
            }

            const newItem = {
                user_id,
                kode_istri,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            try {
                const docRef = db.collection('Husband').doc();
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
    
    getHusband: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Husband').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Husband not found' }).code(404);
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

    getAllHusband: async (request, h) => {
        try {
            const snapshot = await db.collection('Husband').get();
            const husband = [];
            snapshot.forEach(doc => {
                husband.push({ id: doc.id, ...doc.data() });
            });

            return h.response({ status: 'success', data: husband }).code(200);
        } catch (error) {
            console.error('Error fetching documents:', error);
            return h.response({ status: 'fail', message: 'Error fetching documents' }).code(500);
        }
    },

    updateHusband: async (request, h) => {
        try {
            const { id } = request.params;
            const {
                user_id,
                kode_istri
            } = request.payload;

            const updatedItem = {
                user_id,
                kode_istri,
                updated_at: new Date().toISOString()
            };

            Object.keys(updatedItem).forEach(key => {
                if (updatedItem[key] === undefined) {
                    delete updatedItem[key];
                }
            });

            try {
                const docRef = db.collection('Husband').doc(id);
                await docRef.update(updatedItem);

                const updatedDoc = await docRef.get();

                if (!updatedDoc.exists) {
                    return h.response({ status: 'fail', message: 'Husband not found' }).code(404);
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

    deleteHusband: async (request, h) => {
        try {
            const { id } = request.params;

            const docRef = db.collection('Husband').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return h.response({ status: 'fail', message: 'Husband not found' }).code(404);
            }

            await docRef.delete();

            return h.response({ status: 'success', message: 'Husband deleted successfully' }).code(200);
        } catch (error) {
            console.error('Error deleting document:', error);
            return h.response({ status: 'fail', message: 'Error deleting document' }).code(500);
        }
    },
};


module.exports = husbandController;