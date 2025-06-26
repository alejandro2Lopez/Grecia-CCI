import {
    nameString,
    email,
    phoneCR,
    requiredDate,
    requiredPositiveNumber,
    idCard,
    nationality,
    address, text_normal,
    requiredPositiveNumberTeacher
} from './validators';
import { z } from 'zod';


export const formSchema_Student = z.object({
    p_full_name: nameString,
    p_email: email,
    p_birth_date: requiredDate,
    p_card_id: idCard,
    p_phone_number: phoneCR,
    p_phone_number_optional: phoneCR.optional().or(z.literal('')),
    p_marital_status: nationality,
    p_nationality: nationality,
    p_home_direction: address,
    p_occupation: nameString, // o un select
    ce_full_name: nameString,
    ce_kindred: nameString,
    ce_phone_number: phoneCR,
});

export const formSchema_StudentUpdate = z.object({
    p_personid: requiredPositiveNumber, // por ejemplo, ID del usuario
    p_full_name: nameString,
    p_email: email,
    p_birth_date: requiredDate,
    p_card_id: idCard,
    p_phone_number: phoneCR,
    p_phone_number_optional: phoneCR.optional().or(z.literal('')),
    p_marital_status: nationality,
    p_nationality: nationality,
    p_home_direction: address,
    p_occupation: nameString, // o un select
    ce_contact_id: requiredPositiveNumber.optional(),
    ce_full_name: nameString,
    ce_kindred: nameString,
    ce_phone_number: phoneCR,
});


export const courseSchema = z.object({
    e_start_date: requiredDate,
    e_schedule: address,
    e_enrolment_payment: requiredPositiveNumber,
    e_next_payment: requiredDate,
    e_course_payment: requiredPositiveNumber, //QUITAR
    e_first_course_payment: requiredPositiveNumber, //QUITAR
    e_enrollment_paymentSN: requiredPositiveNumber,
    e_course_id: requiredPositiveNumber,
    e_person_teacher_id: requiredPositiveNumberTeacher,
    e_notes: address,
    e_active: requiredPositiveNumber.optional(),
    e_enrolment_id: requiredPositiveNumber.optional(),

});

export const formSchema_Teacher = z.object({
    p_person_id: requiredPositiveNumber.optional().or(z.literal(1)),
    p_full_name: nameString,
    p_email: email,
    p_birth_date: requiredDate,
    p_card_id: idCard,
    p_phone_number: phoneCR,
    p_phone_number_optional: phoneCR.optional().or(z.literal('')),
    p_language_id: requiredPositiveNumber,
    p_nationality: nationality,
    p_home_direction: address,
    p_occupation: nameString,
});