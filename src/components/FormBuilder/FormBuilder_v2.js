import React, { useRef, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { FormBuilder } from "@jeremyling/react-material-ui-form-builder";
import { Button } from "@mui/material";
import { get, isEmpty } from "lodash";
import term from "../../terms";
import client from "../../API/metro";
import { Box } from "@mui/system";

let picker = {
  tagsIds: [],
  relevantTo: [
    { id: 'INFANCY', title: term('infancy') },
    { id: 'KIDS', title: term('kids') },
    { id: 'YOUTH', title: term('youth') },
    { id: 'ALL_FAMILY', title: term('all_family') },
    { id: 'YOUNG_ADULTS', title: term('young_adults') },
    { id: 'ADULTS', title: term('adults') },
    { id: 'FAMALIES', title: term('families') },
    { id: 'GOLDEN_AGE', title: term('golden_age') },
    { id: 'WOMEN_ONLY', title: term('women_only') },
    { id: 'MEN_ONLY', title: term('men_only') },
  ],
  reservations: [
    { id: 'FREE', title: term('free') },
    { id: 'FREE_WITH_RESERVATION', title: term('free_with_reservation') },
    { id: 'PAYMENT', title: term('payment') },
    { id: 'PAYMENT_WITH_RESERVATION', title: term('payment_with_reservation') },
    { id: 'ON_PLACE', title: term('on_place') },
  ],
  authorityId: []
};

async function validate(refs, form) {

  let errors = {};
  for (const [attribute, ref] of Object.entries(refs.current)) {
    if (ref.validate) {
      const error = await ref.validate(get(form, attribute));
      if (error.length) {
        errors[attribute] = error;
      }
    }
  }
  if (!isEmpty(errors)) {
    console.log(errors);
    return false;
  }
  return true;
}

export default function FormBuilder_v2() {

  const fields = [
    //---- name ----
    {
      col: {
        xs: 6
      },
      label: term('name'),
      props: {
        required: true
      },
      attribute: 'name',
      component: "text-field",
      validations: {
        label: term('name'),
        required: term('this_filed_is_required'),
      },
      validationType: "string"
    },
    //---- authority ----
    {
      col: {
        xs: 6
      },
      label: term('authority'),
      props: {
        required: true
      },
      attribute: 'authorityId',
      component: "autocomplete",
      validations: {
        label: term('authority'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
      options: picker.authorityId,
      optionConfig: {
        key: "id",
        value: "id",
        label: "title",
      },
    },
    //---- for whom ----
    {
      col: {
        xs: 6
      },
      label: term('for_whom'),
      props: {
        required: true
      },
      attribute: 'relevantTo',
      component: "autocomplete",
      options: picker.relevantTo,
      optionConfig: {
        key: "id",
        value: "id",
        label: "title",
      },
      props: {
        autoHighlight: true,
        multiple: true,
        fullWidth: true,
        filterSelectedOptions: true,
        getOptionDisabled: () => form?.relevantTo?.length >= 3

      },
      validations: {
        label: term('for_whom'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- tags ----
    {
      col: {
        xs: 6
      },
      label: term('tags'),
      attribute: 'tagsIds',
      component: "autocomplete",
      options: picker.tagsIds,
      optionConfig: {
        key: "id",
        value: "id",
        label: "title",
      },
      props: {
        autoHighlight: true,
        multiple: true,
        fullWidth: true,
        filterSelectedOptions: true,
        getOptionDisabled: () => form?.tagsIds?.length >= 5
      },
      validations: {
        label: term('tags'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- reservations ----
    {
      col: {
        xs: 6
      },
      label: term('reservations'),
      attribute: 'reservations',
      component: "autocomplete",
      options: picker.reservations,
      optionConfig: {
        key: "id",
        value: "id",
        label: "title",
      },
      props: {
        autoHighlight: true,
        multiple: true,
        fullWidth: true,
        filterSelectedOptions: true,
        getOptionDisabled: () => form?.tagsIds?.length > 5
      },
      validations: {
        label: term('reservations'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- websites ----
    {
      col: {
        xs: 6
      },
      label: term('websites'),
      attribute: 'websitesUrl',
      component: "text-field",
      validations: {
        label: term('websites'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- description ----
    {
      col: {
        xs: 6
      },
      label: term('description'),
      props: {
        rows: 4,
        multiline: true,
      },
      attribute: 'description',
      component: "text-area",
      validations: {
        label: term('description'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- phone ----
    {
      col: {
        xs: 6
      },
      label: term('phone'),
      attribute: 'phoneNumber',
      component: "text-field",
      validations: {
        label: term('phone'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- contact person ----
    {
      col: {
        xs: 6
      },
      label: term('contact_person'),
      attribute: 'contactPersonName',
      component: "text-field",
      validations: {
        label: term('contact_person'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- contact person phone ----
    {
      col: {
        xs: 6
      },
      label: term('contact_person_phone'),
      attribute: 'contactPersonPhoneNumber',
      component: "text-field",
      validations: {
        label: term('contact_person_phone'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- email ----
    {
      col: {
        xs: 6
      },
      label: term('email'),
      attribute: 'emailAddress',
      component: "text-field",
      validations: {
        label: term('email'),
        required: term('this_filed_is_required'),
        email: true,
      },
      validationType: "string",
    },
    //---- facebook ----
    {
      col: {
        xs: 6
      },
      label: term('facebook'),
      attribute: 'facebookPageUrl',
      component: "text-field",
      validations: {
        label: term('facebook'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- instagram ----
    {
      col: {
        xs: 6
      },
      label: term('instagram'),
      attribute: 'instagramPageUrl',
      component: "text-field",
      validations: {
        label: term('instagram'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- youtube ----
    {
      col: {
        xs: 6
      },
      label: term('youtube'),
      attribute: 'youtubePageUrl',
      component: "text-field",
      validations: {
        label: term('youtube'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- short description ----
    {
      col: {
        xs: 6
      },
      label: term('short_description'),
      attribute: 'shortDescription',
      component: "text-field",
      validations: {
        label: term('short_description'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- reservation link ----
    {
      col: {
        xs: 6
      },
      label: term('reservation_link'),
      attribute: 'reservationUrl',
      component: "text-field",
      validations: {
        label: term('reservation'),
        required: term('this_filed_is_required'),
      },
      validationType: "string",
    },
    //---- open on weekend ----
    {
      col: {
        xs: 6
      },
      title: term('open_on_weekend'),
      attribute: 'openOnWeekend',
      component: "checkbox-group",
      options: [
        { id: true, title: 'Yes' },
        { id: false, title: 'No' },
      ],
      optionConfig: {
        key: "id",
        value: "id",
        label: "title",
      },
      validations: {
        label: term('open_on_weekend'),
        required: term('this_filed_is_required'),
      },
      idPrefix: "checkbox",
    },
    //---- is kosher ----
    {
      col: {
        xs: 6
      },
      title: term('is_kosher'),
      attribute: 'isKosher',
      component: "checkbox-group",
      options: [
        { id: true, title: 'Yes' },
        { id: false, title: 'No' },
      ],
      optionConfig: {
        key: "id",
        value: "id",
        label: "title",
      },
      validations: {
        label: term('is_kosher'),
        required: term('this_filed_is_required'),
      },
      idPrefix: "checkbox",
    },
    //---- is accessable ----
    {
      col: {
        xs: 6
      },
      title: term('is_accessable'),
      attribute: 'isAccessable',
      component: "checkbox-group",
      options: [
        { id: true, title: 'Yes' },
        { id: false, title: 'No' },
      ],
      optionConfig: {
        key: "id",
        value: "id",
        label: "title",
      },
      validations: {
        label: term('is_accessable'),
        required: term('this_filed_is_required'),
      },
      idPrefix: "checkbox",
    },
    //---- open 24 hours ----
    {
      col: {
        xs: 6
      },
      title: term('open_24_hours'),
      attribute: 'open24Hours',
      component: "checkbox-group",
      options: [
        { id: true, title: 'Yes' },
        { id: false, title: 'No' },
      ],
      optionConfig: {
        key: "id",
        value: "id",
        label: "title",
      },
      validations: {
        label: term('open_24_hours'),
        required: term('this_filed_is_required'),
      },
      idPrefix: "checkbox",
    },
  ];
  //---- end of form fields ----

  const [form, setForm] = useState({});
  const refs = useRef({});

  //global
  const { area, editTabData } = useSelector(state => state.mainReducer)

  const updateForm = (updates) => {
    const copy = { ...form };
    for (const [key, value] of Object.entries(updates)) {
      copy[key] = value;
    }
    setForm(copy);
  };

  const handleNext = async (event) => {
    event.preventDefault();
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }
    console.log(form);
  };


  useEffect(() => {
    (async () => {
      await client.service("authorities").find({ query: { areaId: area.id } })
        .then((res) => res.data.map(({ name, _id }) => ({ id: _id, title: name })))
        .then((authorities => picker.authorityId = authorities))

      await client.service('area').find({ query: { _id: area.id } })
        .then(({ data }) => data[0].tags.map(({ title, _id }) => picker.tagsIds = [...picker.tagsIds, { title, id: _id }]));

      await client.service('tag-categories').find({ query: { areaId: area.id } })
        .then(({ data }) => data.map(({ areaId, tagId, categoryId, userId }) => console.log(areaId, tagId, categoryId, userId)))
    })()
  }, [area])

  return (
    <>
      <Box style={{ padding: "16px" }}>
        <FormBuilder
          fields={fields}
          defaultValues={editTabData}
          form={form}
          updateForm={updateForm}
          refs={refs}
        />
        <Button
          type="submit"
          letiant="contained"
          color="primary"
          sx={{ mt: 1 }}
          onClick={handleNext}
        >
          Next
        </Button>
        {JSON.stringify(form, null, 2)}
      </Box>
    </>
  );
}
