import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { Box, Button, Grid } from "@mui/material";
import GoogleAutocomplete from "../GoogleAutocomplete/GoogleAutocomplete";
import useStyles from "./styles";
import TimesPicker from '../TimePicker/TimePicker'
import term from "../../terms";
import { useJsApiLoader } from '@react-google-maps/api';
import ImagePicker from "../imagePicker/ImagePicker";
import { formatObjects } from './FormFunctions'
import Divider from "./FormFields/Divider";
import Text from './FormFields/Text'
import Picker from "./FormFields/Picker";
import DatePicker from "./FormFields/DatePicker";
import TimePicker from './FormFields/TimePicker'
import TagsPicker from "./FormFields/TagsPicker";
import Checkbox from "./FormFields/Checkbox";
import Map from "./FormFields/Map";
import SizableText from "./FormFields/SizableText";
import DraggableListWithImages from "./FormFields/DraggableListWithImages";
import Toast from "../../utils/useToast";
import ERRORS from "../../data/errors";
import Helper from "./FormFields/Helper";
import GetPermissions from "../../hooks/GetPermissions";

//Constants
const IMAGE_PICKER_TITLE = term('choose_a_theme_image')

const MyForm = React.memo(({ fields, data, options, submitFunction, validiationFunction, isPartOfStepper, orientation, setExternalValues }) => {

  let classes = useStyles()

  const { REACT_APP_GOOGLE_API_KEY } = process.env
  const { isLoaded } = useJsApiLoader({ libraries: ["places"], id: 'google-map-script', googleMapsApiKey: REACT_APP_GOOGLE_API_KEY })
  const permissions = GetPermissions()

  const [resizableText, setResizableText] = useState("")
  const [times, setTimes] = useState({})
  const [chosenImage, setChosenImage] = useState(null)
  const [tagsPickerItems, setTagsPickerItems] = useState({})

  useEffect(() => {
    setResizableText(data.description)
    setTimes(data.openingHours)
    setChosenImage(data.coverImageFileId)
    setTagsPickerItems(() => {
      return (
        {
          tags: data.tags ? data.tags.map(tag => {
            return ({
              category: typeof tag.category === 'string' ? tag.category : tag.category.title,
              label: tag.label === undefined ? tag.tag.title + " - " + term(tag.category.title.toLowerCase()) : tag.label,
              value: tag.value === undefined ? tag._id : tag.value
            })
          }) : [],
          relevantTo: data.relevantTo ? data.relevantTo.length > 0 && typeof data.relevantTo[0] === 'string' ? options.relevantTo.filter(option => {
            return data.relevantTo.includes(option.id)
          }).map(item => ({ label: item.title, value: item.id })) : data.relevantTo : [],
          inPlace: data.inPlace ? data.inPlace.length > 0 && typeof data.inPlace[0] === 'string' ? options.inPlace.filter(option => {
            return data.inPlace.includes(option.id)
          }).map(item => ({ label: item.title, value: item.id })) : data.inPlace : [],
          objectIds: data.objectIds,
        }
      )
    }
    )
  }, [data])

  const formatValuesToSend = (values) => {
    if (fields.find(item => item.field === 'description') && resizableText.length < 1) {
      Toast(term(ERRORS.EMPTY_DESCRIPTION))
      return
    }
    if (fields.find(item => item.field === 'tags') && tagsPickerItems.tags.length < 1) {
      Toast(term(ERRORS.ONE_TAG))
      return
    }
    if (fields.find(item => item.field === 'tags') && tagsPickerItems.tags.length > 5) {
      Toast(term(`please_choose_up_to`) + '5' + term('tags'))
      return
    }

    const formattedItemsToSend = formatObjects(tagsPickerItems.objectIds, options)

    submitFunction({
      ...values,
      description: resizableText,
      openingHours: times,
      objectIds: formattedItemsToSend,
      coverImageFileId: chosenImage,
      tags: tagsPickerItems.tags,
      relevantTo: tagsPickerItems.relevantTo,
      inPlace: tagsPickerItems.inPlace,
    })
  }

  return (
    <>
      {
        <Form
          onSubmit={(values) => formatValuesToSend(values)}
          initialValues={data}
          validate={validiationFunction}
          render={({ handleSubmit, values }) => {
            return (
              <form onSubmit={handleSubmit} noValidate className={classes.form}>
                <Grid container spacing={2} className={classes.gridContainer}>
                  {fields.map(({ type, field, title, size, tooltip, text }) => (
                    <Grid key={field} item xs={12} md={size === 'small' ? 3 : size === 'medium' ? 6 : 12} className={type === 'googleAutocomplete' ? '' : classes.item}>
                      {type === "textfield" && (
                        <Box>
                          {tooltip && <Helper tooltip={tooltip} />}
                          <TextField disabled={!permissions.edit} label={title} name={field} tooltip={tooltip} />
                        </Box>
                      )}
                      {type === "number" && (
                        <TextField disabled={!permissions.edit} label={title} name={field} type={'number'} />
                      )}
                      {type === 'divider' && (
                        <Divider />
                      )}
                      {type === 'placeholder' && (
                        <Box>

                        </Box>
                      )}
                      {type === 'text' && (
                        <Text title={title} />
                      )}
                      {type === "picker" && (
                        <Picker disabled={!permissions.edit} title={title} field={field} options={options} />
                      )}
                      {type === 'datePicker' &&
                        <DatePicker disabled={!permissions.edit} title={title} field={field} />
                      }
                      {type === 'timePicker' &&
                        <TimePicker disabled={!permissions.edit} title={title} field={field} />
                      }
                      {type === "tagsPicker" && options[field].length > 0 && Boolean(Object.keys(tagsPickerItems).length) && tagsPickerItems[field].length > 0 && (
                        <TagsPicker
                          field={field}
                          title={title}
                          options={options[field]}
                          values={tagsPickerItems[field]}
                          setValues={setTagsPickerItems}
                          tooltip={tooltip}
                          disabled={!permissions.edit}
                        />
                      )}
                      {type === "tagsPicker" && options[field].length > 0 && Boolean(Object.keys(tagsPickerItems).length) && tagsPickerItems[field].length === 0 && (
                        <TagsPicker
                          field={field}
                          title={title}
                          options={options[field]}
                          values={[]}
                          setValues={setTagsPickerItems}
                          tooltip={tooltip}
                          disabled={!permissions.edit}
                        />
                      )}
                      {type === "checkbox" && (
                        <Checkbox field={field} title={title} disabled={!permissions.edit} />
                      )}
                      {type === "googleAutocomplete" && (
                        <GoogleAutocomplete disabled={!permissions.edit} setFatherValue={setExternalValues} text={text} />
                      )}
                      {type === "MapPicker" && (
                        <Map field={field} setExternalValues={setExternalValues} data={data} isLoaded={isLoaded} />
                      )}
                      {type === 'timesPicker' && (
                        <TimesPicker disabled={!permissions.edit} title={title} realData={times} setTimes={(newTimes) => { setTimes(newTimes) }} />
                      )}
                      {type === 'textAreaSizeable' && (
                        <SizableText disabled={!permissions.edit} tooltip={tooltip} field={field} classes={classes} resizableText={resizableText} setResizableText={setResizableText} />
                      )}
                      {type === 'imagePicker' && (
                        <ImagePicker
                          title={IMAGE_PICKER_TITLE}
                          pictures={values[field]}
                          setChosenImage={setChosenImage}
                          chosenImage={chosenImage}
                          disabled={!permissions.edit}
                        />
                      )}
                      {type === 'send_mail_button' && (
                        <Button
                          variant={"contained"}
                          style={{ width: '100%', textAlign: 'center' }}
                          onClick={() => {
                            window.location.href =
                              `mailto:${data.email}`
                          }}
                          disabled={data.email ? false : true}
                        >
                          {title}
                        </Button>
                      )}
                      {type === 'draggableListWithPickerAndImages' && options[field].length > 0 && tagsPickerItems[field] && values && (
                        <DraggableListWithImages
                          IMAGE_PICKER_TITLE={IMAGE_PICKER_TITLE}
                          field={field}
                          title={title}
                          options={options}
                          chosenImage={chosenImage}
                          setChosenImage={setChosenImage}
                          setItemsToSend={setTagsPickerItems}
                          itemsToSend={tagsPickerItems[field]}
                          disabled={!permissions.edit}
                          valuesForPicker={tagsPickerItems[field].map(object => {
                            return (
                              { label: options[field].find(tag => tag.id === object)?.title, value: options[field].find(tag => tag.id === object)?._id }
                            )
                          })}
                          setValuesForPicker={setTagsPickerItems}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Box className={
                  orientation === 'rtl' ?
                    classes.submitButtonLeft : classes.submitButtonRight
                }>
                  <Button variant="contained" type="submit">{isPartOfStepper ? term('next') : term('submit')}</Button>
                </Box>
              </form >
            )
          }}
        />
      }
    </>
  )
})

export default MyForm;