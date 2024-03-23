const express = require('express')
const app = express()

require("dotenv").config({ path: "./Config/.env" })
require("./config/db.js")

const port = 5000
app.listen(port, () => {
    console.log('Server is running on ${port}')
})
let PersonModel = require('./Models/personne.js')

let doc = new PersonModel({
    name: 'Mariama',
    age: 21,
    favoriteFoods: ['Yassa Guinar', 'Vermicelle']
})

doc.save()
    .then(saveDoc => {
        console.log(saveDoc);
    })
    .catch(err => {
        console.error(err);
    });

let arrayOfPeople = [
    { name: 'Mamy Gomis', age: 24, favoriteFoods: ['Sushi', 'Riz'] },
    { name: 'Astou Ndiaye', age: 26, favoriteFoods: ['Yassa', 'Burger'] },
    { name: 'Ndeye Awa', age: 25, favoriteFoods: ['Steak', 'Salad'] }
];

//     //Créons plusieurs enregistrements avec model.create()
PersonModel.create(arrayOfPeople)
    .then(createdPeople => {
        console.log('Personnes créées avec succès :', createdPeople);
    })
    .catch(err => {
        console.error('Erreur lors de la création des personnes :', err);
    });

PersonModel.find({ name: 'Mamy Gomis' })
    .then(people => {
        console.log('Personnes trouvées :', people);
    })
    .catch(err => {
        console.error('Erreur lors de la recherche des personnes :', err);
    });

//effectuons une recherche dans la base de données
PersonModel.findOne({ favoriteFoods: 'Yassa' })
    .then(person => {
        console.log('Personne trouvée :', person);
    })
    .catch(err => {
        console.error('Erreur lors de la recherche de la personne :', err);
    });

// ID_de_la_personne
let personId = '65fc3927765512266a323eb5';
PersonModel.findById(personId)
    .then(person => {
        console.log('Personne trouvée par ID :', person);
    })
    .catch(err => {
        console.error('Erreur lors de la recherche de la personne par ID :', err);
    });

//  personId est l'ID de la personne que l'on souhaite mettre à jour
PersonModel.findById(personId)
    .then(person => {
        if (!person) {
            throw new Error('Personne non trouvée');
        }
        person.favoriteFoods.push('Hamburger');
        return person.save();
    })
    .then(updatedPerson => {
        console.log('Personne mise à jour avec succès :', updatedPerson);
    })
    .catch(err => {
        console.error('Erreur lors de la mise à jour de la personne :', err);
    });


// Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()
let personName= 'Mariama';
PersonModel.findOneAndUpdate({ name: personName}, { age: 20 }, { new: true })
    .then(updatedPerson => {
        console.log('Personne mise à jour avec succès :', updatedPerson);
    })
    .catch(err => {
        console.error('Erreur lors de la mise à jour de la personne :', err);
    });

// Supposons que personId est l'ID de la personne que vous souhaitez supprimer
PersonModel.findByIdAndDelete(personId)
.then(removedPerson => {
    console.log('Personne supprimée avec succès :', removedPerson);
})
.catch(err => {
    console.error('Erreur lors de la suppression de la personne :', err);
});


// Supprimer toutes les personnes dont le nom est "Mary"
PersonModel.deleteMany({ name: 'Mary' })
    .then(result => {
        console.log('Personnes "Mary"supprimées avec succès :', result);
    })
    .catch(err => {
        console.error('Erreur lors de la suppression des personnes "Mary" :', err);
    });
