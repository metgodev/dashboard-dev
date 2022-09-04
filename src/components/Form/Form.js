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

//Constants
const IMAGE_PICKER_TITLE = term('choose_a_theme_image')

const MyForm = React.memo(({ fields, data, options, submitFunction, validiationFunction, isPartOfStepper, orientation, setExternalValues }) => {

  let classes = useStyles()

  const { REACT_APP_GOOGLE_API_KEY } = process.env
  const { isLoaded } = useJsApiLoader({ libraries: ["places"], id: 'google-map-script', googleMapsApiKey: REACT_APP_GOOGLE_API_KEY })

  const [resizableText, setResizableText] = useState("")
  const [times, setTimes] = useState({})
  const [chosenImage, setChosenImage] = useState(null)
  const [itemsToSend, setItemsToSend] = useState([])

  useEffect(() => {
    setResizableText(data.description)
    setTimes(data.openingHours)
    setChosenImage(data.coverImageFileId)
  }, [data])

  const formatValuesToSend = (values) => {
    if ((fields.description !== undefined && fields.description !== null) && resizableText.length < 1) {
      Toast(ERRORS.EMPTY_DESCRIPTION)
      return
    }
    const formattedItemsToSend = formatObjects(itemsToSend, options)
    submitFunction({ ...values, description: resizableText, openingHours: times, objectIds: formattedItemsToSend, coverImageFileId: chosenImage })
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
                  {fields.map(({ type, field, title, size }) => (
                    <Grid key={field} item xs={12} md={size === 'small' ? 3 : size === 'medium' ? 6 : 12} className={type === 'googleAutocomplete' ? '' : classes.item}>
                      {type === "textfield" && (
                        <TextField label={title} name={field} />
                      )}
                      {type === "number" && (
                        <TextField label={title} name={field} type={'number'} />
                      )}
                      {type === 'divider' && (
                        <Divider />
                      )}
                      {type === 'text' && (
                        <Text title={title} />
                      )}
                      {type === "picker" && (
                        <Picker title={title} field={field} options={options} />
                      )}
                      {type === 'datePicker' &&
                        <DatePicker title={title} field={field} />
                      }
                      {type === 'timePicker' &&
                        <TimePicker title={title} field={field} />
                      }
                      {type === "tagsPicker" && options[field].length > 0 && (
                        <TagsPicker field={field} title={title} options={options} />
                      )}
                      {type === "checkbox" && (
                        <Checkbox field={field} title={title} />
                      )}
                      {type === "googleAutocomplete" && (
                        <GoogleAutocomplete setFatherValue={setExternalValues} text={term('or_search_on_map')} />
                      )}
                      {type === "MapPicker" && (
                        <Map field={field} setExternalValues={setExternalValues} data={data} isLoaded={isLoaded} />
                      )}
                      {type === 'timesPicker' && (
                        <TimesPicker title={title} realData={times} setTimes={(newTimes) => { setTimes(newTimes) }} />
                      )}
                      {type === 'textAreaSizeable' && (
                        <SizableText field={field} classes={classes} resizableText={resizableText} setResizableText={setResizableText} />
                      )}
                      {type === 'imagePicker' && (
                        <ImagePicker
                          title={IMAGE_PICKER_TITLE}
                          pictures={values[field]}
                          setChosenImage={setChosenImage}
                          chosenImage={chosenImage}
                        />
                      )}
                      {type === 'draggableListWithPickerAndImages' && options[field].length > 0 && values[field] && (
                        <DraggableListWithImages
                          IMAGE_PICKER_TITLE={IMAGE_PICKER_TITLE}
                          values={values}
                          field={field}
                          title={title}
                          options={options}
                          chosenImage={chosenImage}
                          setChosenImage={setChosenImage}
                          setItemsToSend={setItemsToSend}
                          itemsToSend={itemsToSend}
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