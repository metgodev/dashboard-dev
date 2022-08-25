import React from 'react'
import ImagePicker from '../../imagePicker/ImagePicker'
import DraggableList from '../../DraggableList/DraggableList'
import TagsPicker from './TagsPicker'

function DraggableListWithImages({ IMAGE_PICKER_TITLE, values, field, title, options, chosenImage, setChosenImage, setItemsToSend, itemsToSend }) {
    return (
        <>
            <ImagePicker
                title={IMAGE_PICKER_TITLE}
                data={
                    {
                        ids: values[field].filter(value => options[field].find(pic => pic?.id === value && pic.galleryFileIds.length > 0)),
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
            />
            <TagsPicker title={title} field={field} options={options} />
            <DraggableList
                items={values[field]}
                names={options[field]}
                setItemsToSend={setItemsToSend}
                itemsToSend={itemsToSend}
            />
        </>
    )
}

export default DraggableListWithImages