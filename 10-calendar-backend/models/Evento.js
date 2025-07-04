import { Schema, model } from "mongoose";

const EventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
});

EventoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = this._id;
    return object;
})

export const Evento = model('Evento', EventoSchema);
