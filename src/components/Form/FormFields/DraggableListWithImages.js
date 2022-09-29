import React from 'react'
import ImagePicker from '../../imagePicker/ImagePicker'
import DraggableList from '../../DraggableList/DraggableList'
import TagsPicker from './TagsPicker'

function DraggableListWithImages({ IMAGE_PICKER_TITLE, field, title, options, chosenImage, setChosenImage, setItemsToSend, itemsToSend, valuesForPicker, setValuesForPicker, disabled }) {

    return (
        <>
            {valuesForPicker !== undefined && <ImagePicker
                title={IMAGE_PICKER_TITLE}
                disabled={disabled}
                data={
                    {
                        ids: valuesForPicker.map(item => item.value).filter(value => options[field].find(pic => pic?.id === value && pic.galleryFileIds.length > 0)),
                        pictures: options[field]
                            .filter(item => {
                                return item.galleryFileIds !== null && item.galleryFileIds !== undefined && item.galleryFileIds.length > 0
                            })
                            .map(item => {
                                return (
                                    {
                                        id: item?.id,
                                        url: item?.gallery ? item.gallery[0]?.file?.url : null,
                                        pictureId: item?.gallery ? item.gallery[0].fileId : null
                                    }
                                )
                            })
                    }
                }
                setChosenImage={setChosenImage}
                chosenImage={chosenImage}
            />}
            {valuesForPicker.length > 0 &&
                <TagsPicker
                    title={title}
                    field={field}
                    options={options[field]}
                    values={valuesForPicker}
                    setValues={setValuesForPicker}
                    disabled={disabled}
                />}
            {valuesForPicker.length === 0 &&
                <TagsPicker
                    title={title}
                    field={field}
                    options={options[field]}
                    values={valuesForPicker}
                    setValues={setValuesForPicker}
                    disabled={disabled}
                />}
            {itemsToSend !== undefined &&
                <DraggableList
                    names={options[field]}
                    setItemsToSend={setItemsToSend}
                    itemsToSend={itemsToSend}
                    disabled={disabled}
                />}
        </>
    )
}

export default React.memo(DraggableListWithImages)