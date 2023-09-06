import asyncHandler from "express-async-handler";
import Contact from "../model/Contact.js";

//create

export const createContact = asyncHandler(async (req, res)=>{

    const {name,email,contact} =req.body;

    if(!name || !email || !contact){
        res.status(400);
        throw new Error("All fields are mandatory")
    };

    const contacts = await Contact.create({name,email,contact});
    res.status(201).json(contacts);


})
//get
export const getContacts = asyncHandler(async (req, res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);

})

//update a single contact
export const updateContact = asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");        
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new:true});

    res.status(200).json(updatedContact);
})

//get single contact
export const getContact = async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");        
    }
    res.status(200).json(contact);

}

//delete a single contact
export const deleteContact = asyncHandler (async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");        
    }
    const deleteContact = await Contact.findOneAndDelete(req.params.id);
    res.status(200).json({message: `Delete contact for ${req.params.id}`})
    
})
