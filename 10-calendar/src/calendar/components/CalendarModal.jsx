import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { addHours } from "date-fns";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useSelector } from "react-redux";

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {
    const {isDateModalOpen, closeDateModal} = useUiStore();
    const {activeEvent, startSavingEvent} = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: 'JT',
        notes: 'Some notes...',
        start: new Date(),
        end: addHours(new Date(), 2)

    }
    )

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({
                ...activeEvent
            });
        } else {
            // Reset form when no active event (new event)
            setFormValues({
                title: '',
                notes: '',
                start: new Date(),
                end: addHours(new Date(), 2)
            });
        }
        
        // Reset form submission state when modal opens
        setFormSubmitted(false);
    }, [activeEvent])

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'
    }, [formValues.title, formSubmitted])


    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    const closeModal = () => {
        closeDateModal();
    }

    const onInputChanged = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        })
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (formValues.end <= formValues.start) {
            Swal.fire(
                'Fechas Incorrectas',
                'Revisa las fechas ingresadas',
                'error'
            )
            return;
        }

        if (formValues.title.length <= 0) return;

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);

        Swal.fire(
            'Evento creado exitosamente',
            'Ahora puedes verlo en el calendario',
            'success'
        )
        return;
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >

            <h1>{activeEvent ? 'Editar evento' : 'Nuevo evento'}</h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => {
                            onDateChanged(event, 'start')
                        }}
                        dateFormat="Pp"
                        className="form-control"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => {
                            onDateChanged(event, 'end')
                        }}
                        dateFormat="Pp"
                        className="form-control"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        onChange={onInputChanged}
                        value={formValues.title}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        onChange={onInputChanged}
                        value={formValues.notes}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    );
};
