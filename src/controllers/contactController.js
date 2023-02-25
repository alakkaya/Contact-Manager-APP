const Contact = require("../models/contactModel")


const getAllContacts = async (req, res) => {
    try {
        const getAllContacts = await Contact.find({ user_id: req.user.id })
        return res.status(200).json({
            length: getAllContacts.length,
            success: true,
            data: getAllContacts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Issue" + error
        })
    }
}

const getContact = async (req, res) => {
    const { id } = req.params
    try {
        const getContact = await Contact.findById(id)
        if (getContact) {
            return res.status(200).json({
                success: true,
                message: "Kullanıcı Bulundu",
                data: getContact
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Contact Not Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Issue" + error
        })
    }
}

const createContact = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body
        const _contactName = await Contact.findOne({ name })
        if (_contactName) {
            return res.status(400).json({
                success: false,
                message: "there are already exists with same name"
            })
        }
        const _contactNumber = await Contact.findOne({ phoneNumber })
        if (_contactNumber) {
            return res.status(400).json({
                success: false,
                message: "u have already saved this number"
            })
        }
        const newContact = await Contact.create({
            name,
            email,
            phoneNumber,
            user_id: req.user.id
        })
        return res.status(201).json({
            success: true,
            message: "User Created Succesfully ",
            data: newContact
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server ISSUE" + error
        })
    }
}

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            })
        }

        if (contact.user_id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "User don't have permission to update other user contacts"
            })
        }
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body)
        if (updatedContact) {
            return res.status(200).json({
                success: true,
                message: "Güncelleme Başarılı",
                newData: updatedContact
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt Güncellenemedi"
        })
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params
        const deleteContact = await Contact.findByIdAndDelete(id, req.body)
        if (!deleteContact) {
            return res.status(404).json({
                success: false,
                message: "Contact Not FOUND!"
            })
        }
        if (deleteContact.user_id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "User don't have permission to update other user contacts"
            })
        }
        return res.status(200).json({
            success: true,
            message: "This person has been deleted.",
            deletedUser: deleteContact
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Issue" + error
        })
    }
}

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}