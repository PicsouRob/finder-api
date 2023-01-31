const mongoose = require("mongoose");
const User = mongoose.model('User');

module.exports = {
    getUserById: async (req, res) => {
        const id = mongoose.Types.ObjectId(`${req.params.id}`);
        User.findOne({ _id: id })
        .then((response) => {
            if(!response) return res.send({ 
                    error: "Oups ! désolé, aucun résultat trouvé"
                });

            return res.status(200).send(response);
        })
    },
    getUserPhoto: (req, res) => {
        User.findOne({ email: req.params.email })
        .select({ image: true })
        .then((response) => {
            if(!response) return res.send({ 
                    error: "Oups ! désolé, aucun utilateur trouvé"
            });

            return res.status(200).send(response);
        })
    },
    updateUser: async (req, res) => {
        User.updateOne({ _id: req.params.id 
        }, req.body).exec().then(() => res.send({ 
            success: "Votre profile a été modifié avec succès"
        })).catch(error => res.json({ error }));
    },
    updateProfilPhoto: (req, res) => {
        const image = `https://finderht.herokuapp.com/userProfil/${req.file.filename}`;
        User.updateOne({ _id: req.params.id 
        }, { image }).exec().then(() => res.send({ 
            success: "Votre photo de profile a été modifié avec succès"
        })).catch(error => res.json({ error }));
    },
    deleteAccount: async (req, res) => {
        const id = mongoose.Types.ObjectId(`${req.params.id}`);
        await User.deleteOne({ _id: id })
        .exec().then(() => {
            res.send({ message: "Utilisateur supprimer avec succèss"})
        }).catch(error => res.json({ error }));
    }
}