// import React from 'react';
// import * as Yup from 'yup';
// import { Form } from 'react-final-form';
// import {
//   Autocomplete,
//   AutocompleteData,
//   Checkboxes,
//   CheckboxData,
//   Select,
//   SelectData,
//   Radios,
//   RadioData,
//   KeyboardDatePicker,
//   DatePicker,
//   Switches,
//   TimePicker,
//   makeValidate,
//   makeRequired,
//   TextField,
//   Debug,
//   SwitchData,
// } from 'mui-rff';
// import term from '../../terms';

// const schema = Yup.object().shape({
//   planet: Yup.array().min(1).required(),
//   best: Yup.array().min(1).required(),
//   available: Yup.boolean().oneOf([true], 'We are not available!').required(),
//   switch: Yup.array().min(1).required(),
//   terms: Yup.boolean().oneOf([true], 'Please accept the terms').required(),
//   date: Yup.date().required(),
//   hello: Yup.string().required(),
//   cities: Yup.array().min(1).required(),
//   gender: Yup.string().required(),
//   birthday: Yup.date().required(),
//   break: Yup.date().required(),
//   hidden: Yup.string().required(),
// });
// /**
//  * Uses the optional helper makeValidate function to format the error messages
//  * into something usable by final form.
//  */
// const validate = makeValidate(schema);
// /**
//  * Grabs all the required fields from the schema so that they can be passed into
//  * the components without having to declare them in both the schema and the component.
//  */
// const required = makeRequired(schema);


// //  {
// //   name: { type: String, required: true },
// //   description: { type: String, required: true },
// //   status: {
// //     type: String,
// //     enum: ["PUBLIC", "PRIVATE", "PENDING_APPROVAL"],
// //     required: true,
// //   },
// //   tagsIds: { type: [String], default: [] },
// //   areaId: { type: String, required: true },
// //   userId: { type: String, required: true },
// //   authorityId: { type: String, required: true },
// //   address: { type: String },
// //   location: {
// //     type: { type: String, enum: ["Point"] },
// //     coordinates: { type: [Number], default: [] },
// //   },
// //   locationInfo: { type: Map, default: {} },
// //   locationName: { type: String },
// //   phoneNumber: { type: String },
// //   contactPersonName: { type: String },
// //   contactPersonPhoneNumber: { type: String },
// //   websitesUrl: { type: [String], default: [] },
// //   emailAddress: { type: String },
// //   relevantTo: {
// //     type: { type: [String], default: [] },
// //     enum: ["INFANCY", "KIDS", "YOUTH", "ALL_FAMILY", "YOUNG_ADULTS", "ADULTS", "FAMALIES", "GOLDEN_AGE", "WOMEN_ONLY", "MEN_ONLY"],
// //   },
// //   facebookPageUrl: { type: String },
// //   instagramPageUrl: { type: String },
// //   youtubePageUrl: { type: String },
// //   galleryFileIds: { type: [Map], default: [] },
// //   openingHours: {
// //     type: Map,
// //     default: {},
// //   },
// //   open24Hours: { type: Boolean, default: false },
// //   openOnWeekend: { type: Boolean, default: false },
// //   isKosher: { type: Boolean, default: false },
// //   isAccessable: { type: Boolean, default: false },
// //   shortDescription: { type: String, required: true },
// //   reservations: {
// //     type: { type: [String], default: [] },
// //     enum: ["FREE", "FREE_WITH_RESERVATION", "PAYMENT", "PAYMENT_WITH_RESERVATION", "ON_PLACE"],
// //   },
// // },

// let picker = {
//   tagsIds: [],
//   relevantTo: [
//     { value: 'INFANCY', label: term('infancy') },
//     { value: 'KIDS', label: term('kids') },
//     { value: 'YOUTH', label: term('youth') },
//     { value: 'ALL_FAMILY', label: term('all_family') },
//     { value: 'YOUNG_ADULTS', label: term('young_adults') },
//     { value: 'ADULTS', label: term('adults') },
//     { value: 'FAMALIES', label: term('families') },
//     { value: 'GOLDEN_AGE', label: term('golden_age') },
//     { value: 'WOMEN_ONLY', label: term('women_only') },
//     { value: 'MEN_ONLY', label: term('men_only') },
//   ],
//   reservations: [
//     { value: 'FREE', name: term('free') },
//     { value: 'FREE_WITH_RESERVATION', name: term('free_with_reservation') },
//     { value: 'PAYMENT', name: term('payment') },
//     { value: 'PAYMENT_WITH_RESERVATION', name: term('payment_with_reservation') },
//     { value: 'ON_PLACE', name: term('on_place') },
//   ],
//   authorityId: []
// };



// function FormExample() {
//   return <MyForm initialValues={{
//     name: '',
//     description: '',
//     status: '',
//     tagsIds: [],
//     areaId: '',
//     userId: '',
//     authorityId: '',
//     address: '',
//     location: {
//       type: '',
//       coordinates: [],
//     },
//     locationInfo: {},
//     locationName: '',
//     phoneNumber: '',
//     contactPersonName: '',
//     contactPersonPhoneNumber: '',
//     websitesUrl: [],
//     emailAddress: '',
//     relevantTo: [],
//     facebookPageUrl: '',
//     instagramPageUrl: '',
//     youtubePageUrl: '',
//     galleryFileIds: [],
//     openingHours: {},
//     open24Hours: false,
//     openOnWeekend: false,
//     isKosher: false,
//     isAccessable: false,
//     shortDescription: '',
//     reservations: [],
//   }} />;
// }

// function MyForm({ initialValues }) {

//   // yes, this can even be async!
//   async function onSubmit(values) {
//     console.log(values);
//   }

//   // yes, this can even be async!
//   async function validate(values) {
//     if (!values.hello) {
//       return { hello: 'Saying hello is nice.' };
//     }
//     return;
//   }

//   return (
//     <Form
//       onSubmit={onSubmit}
//       initialValues={initialValues}
//       validate={validate}
//       render={({ handleSubmit, values }) => (
//         <form onSubmit={handleSubmit} noValidate>
//           <div>
//             <TextField name="name" label="Name" />
//             <Autocomplete name="tagsIds" label="Tags" options={picker.tagsIds} />
//             <Autocomplete multiple={true} name="relevantTo" label="Relevant to" options={picker.relevantTo} />
//           </div>
//           <pre>{JSON.stringify(values)}</pre>
//           <button type="submit" onClick={handleSubmit}>Submit</button>
//         </form>
//       )}
//     />
//   );
// }

// export default FormExample;