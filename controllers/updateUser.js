const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const { validateNewPass } = require('../validations/userValidation');

const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    const token = req.header('auth-token');
    const user = await User.findOne({ email });
    if(!user) {
        return res.json({ error: "L'utilisateur avec cet e-mail n'existe pas" });
    }
    
    user.updateOne({ resetLink: token }, (err, success) => {
        if(err) return res.json({ error: "Quelque chose s'est mal passé" });

        res.status(200).json({ message: "Link reset" });
        next();
    });
}

const resetPassword = async (req, res, next) => {
    const { newPassword, email } = req.body;
    const { error } = await validateNewPass.validate({ newPassword });
    if(error) return res.json({ error: error.details[0].message });

    await User.findOne({ email }).then(async (user) => {
        if(!user.resetLink) {
            return res.json({ error: "Erreur de réinitialiser votre mot de passe" });
        }
        // Hash password......
        const salt = (await bcrypt.genSalt(10)).toString();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Update the password
        user.updateOne({ newPassword: hashedPassword, resetLink: '' }, (err, success) => {
            if(err) return res.json({ error: "Quelque chose s'est mal passé" });
        
            res.json({ message: "Votre mot de passe a été modifié avec succès" });
            next();
        });
    });
}

const updateUser = async (req, res) => {
    const { name, email, phone, description, instagram, 
        facebook, location, website } = req.body;
    
    await User.findOne({ _id: req.params.id })
        .then(user => {
            const image = req.file === undefined ? user.image : 
            `https://finderht.herokuapp.com/userProfil/${req.file.filename}`;

        user.updateOne({ name, email, phone, description, instagram, 
            facebook, location, website, 
            image: image
        }, (err, success) => {
            if(err) return res.json({ error: "Quelque chose s'est mal passé" });

            res.json({ user, message: "Objet modified !" });
        });
    })
    .catch(error => res.json({ error: `Une erreur s'est produite ${error}` }));
}

module.exports.forgetPassword = forgetPassword;
module.exports.resetPassword = resetPassword;
module.exports.updateUser = updateUser;