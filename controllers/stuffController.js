const mongoose = require("mongoose");
const Job = mongoose.model('Job');

const { validatedCreate } = require('../validations/createValidation');

module.exports = {
    addStuff: async (req, res) => {
        const { nameCreator, email, phone, job, description, 
            location, facebookProfil, instagramProfil 
        } = req.body;
        
        let imagesArray = [];
        const { error } = await validatedCreate.validate({ nameCreator, email, phone, 
            job, description, location 
        });

        if(error) return res.json({ error: error.details[0].message });
        
        const existedJob = await  Job.findOne({ nameCreator, job });
        if(existedJob) return res.send({ error: "Vous avez déjà ajouté ce métier" });
        
        req.files === undefined ? imagesArray = [] :
        req.files.forEach((ele) => {
            imagesArray.push(`https://finderht.herokuapp.com/userProfil/${ele.filename}`);
        });
    
        try {
            const jobName = job.charAt(0).toUpperCase() + job.slice(1);
            new Job({ nameCreator, email, userId: req.user._id, phone, 
                job: jobName, description, location, facebookProfil, instagramProfil, 
                images: imagesArray
            }).save().then((jobSuccess, err) => {
                res.send({ jobSuccess });
            });
        } catch(err) {
            res.json({ error: err });
        }
    },
    
    getAllStuff: (req, res) => {
        Job.find()
            .then(things => res.status(200).json(things))
            .catch(error => res.json({ error }));
    },
    
    searchThings: (req, res) => {
        const { value, location } = req.params;
        const capitalizeValue = value.charAt(0).toUpperCase() + value.slice(1);

        if(value && location === "Ville") {
            Job.find({ job: capitalizeValue }).then(response => {
                if(!response) {
                    res.send({ error: `Oups ! désolé, aucun résultat trouvé pour ${job}, Il semble que nous ne puissions trouver aucun résultat basé sur votre recherche. ` });
                } else {
                    return res.status(200).send(response)
                }
            }).catch(error => res.json({ error }));
        } else if(value && location !== "Ville") {
            Job.find({ job: capitalizeValue, location }).then(response => {
                if(!response) {
                    return res.send({ 
                        error: "Oups ! désolé, aucun résultat trouvé"
                    });
                } else {
                    return res.status(200).json(response)
                }
            }).catch(error => res.json({ error }));
        }
    },
    
    getOneStuff: (req, res) => {
        Job.findById(req.params.id)
        .then(job => {
            if(!job) return res.json({ error: `Oups! désolé, aucun résultat trouvé pour ${job.job}` });
            res.status(200).send(job)
        })
        .catch(error => res.json({ error }));
    },
    
    getOneUserStuff: (req, res) => {
        const id = mongoose.Types.ObjectId(`${req.params.id}`);
        Job.find({ userId: req.params.id }).then(response => {
            if(!response) {
                return res.send({ 
                    error: "Oups ! désolé, aucun résultat trouvé"
                });
            }

            return res.send(response)
        }).catch(error => res.json({ error }));
    },
    
    updateThing: async (req, res) => {
        let imagesArray = [];

        await Job.findById(req.params.id).then(async (job, err) => {
            if(!job) return res.send({ error: "Une erreur s'est produite'" });

            try {
                imagesArray.push(...job.images);
                await req.files === undefined ? null :
                req.files.forEach((ele) => {
                    imagesArray.push(`
                        https://finderht.herokuapp.com/userProfil/${ele.filename}
                    `);
                });
                const jobUpdate = { ...req.body, images: imagesArray };

                Job.updateOne({ _id: req.params.id 
                }, jobUpdate).exec().then(() => res.send({ 
                    success: "Votre profile a été modifié avec succès"
                })).catch(error => res.json({ error }));
            } catch (error) {
                res.send({ error: "Une erreur s'est produite'" });
            }
        });
    },
    
    deleteThing: (req, res) => {
        const id = mongoose.Types.ObjectId(`${req.params.id}`);
        Job.deleteOne({ _id: id })
        .exec().then(() => {
            res.send({ message: "Carrier supprimer avec succèss"})
        }).catch(error => res.json({ error }));
    }
}