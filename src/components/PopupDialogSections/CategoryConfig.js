import { useEffect, useState } from 'react'

const date = new Date()

const initialData = {
  name: "",
  authority: "",
  tags: [],
  description: "",
  shortDescription: "",
  isAccessable: false,
  activitiesInPlace: [],
  exclusiveFor: [],
  shady: "",
  arrivalRecommendations: "",
  tip: "",
  prefferedSeason: "",
  inPlace: [],
  relevantTo: [],
  phoneNumber: "",
  websitesUrl: "",
  locationName: "",
  point: [32.109333, 34.855499],
  free: false,
  openHour: date.toISOString(),
  endDate: date.toISOString(),
  startDate: date.toISOString(),
  price: 0,
  online: false,
  onlineMeetingURL: "",
  reservations: [],
  reservationCenterPhone: "",
  reservationCenterEmail: "",
  registrationLink: "",
  openingHours: {
    sunday: { start: "00:00", end: "00:00" },
    monday: { start: "00:00", end: "00:00" },
    tuesday: { start: "00:00", end: "00:00" },
    wednesday: { start: "00:00", end: "00:00" },
    thursday: { start: "00:00", end: "00:00" },
    friday: { start: "00:00", end: "00:00" },
    saturday: { start: "00:00", end: "00:00" }
  },
  open24Hours: false,
  openOnWeekend: false,
  isKosher: false,
  contactPersonName: "",
  contactPersonPhoneNumber: "",
  emailAddress: "",
  facebookPageUrl: "",
  instagramPageUrl: "",
  youtubePageUrl: "",
  time: "",
  tagId: "",
  categoryId: "",
  isRecommended: false,
  isHidden: false,
  objectIds: [],
  coverImageFileId: '',
  whatsAppPhoneNumber: '',
  productIncludes: '',
  style: '',
  shipmentType: '',
  sizeAndDimension: '',
  useageRestrictions: "",
  productComponents: "",
  inStock: true,
  galleryFileIds: [],
  approveContent: true,
  email: '',
  roles: [],
  isPremium: "PRIVATE"
}



export const GetValuesForForm = (values, allTags) => {

  useEffect(() => {
    setReturnValues(valuesForForm)
  }, [values])

  const [returnValues, setReturnValues] = useState("")

  let valuesForForm = {
    name: values.length || Object.keys(values).length ? values.hasOwnProperty('name') ? values.name : initialData.name : initialData.name,
    authorityId: values.length || Object.keys(values).length ? values.hasOwnProperty('authorityId') ? values.authorityId : values.hasOwnProperty('authority') ? values.authority._id : initialData.authority : initialData.authority,
    relevantTo: values.length || Object.keys(values).length ? values.hasOwnProperty('relevantTo') ? values.relevantTo : initialData.relevantTo : initialData.relevantTo,
    tagsIds: values.length || Object.keys(values).length ?
      (values.hasOwnProperty('tags') && !values.hasOwnProperty('tagsIds') ?
        getTagsForForm(values.tags, allTags) : values.hasOwnProperty('tagsIds') ? values.tagsIds
          :
          initialData.tags)
      :
      (initialData.tags),
    openingHours: values.length || Object.keys(values).length ? values.hasOwnProperty('openingHours') ? values.openingHours : initialData.openingHours : initialData.openingHours,
    description: values.length || Object.keys(values).length ? values.hasOwnProperty('description') ? values.description : initialData.description : initialData.description,
    shortDescription: values.length || Object.keys(values).length ? values.hasOwnProperty('shortDescription') ? values.shortDescription : initialData.shortDescription : initialData.shortDescription,
    reservations: values.length || Object.keys(values).length ? values.hasOwnProperty('reservations') ? values.reservations : initialData.reservations : initialData.reservations,
    openOnWeekend: values.length || Object.keys(values).length ? values.hasOwnProperty('openOnWeekend') ? values.openOnWeekend : initialData.openOnWeekend : initialData.openOnWeekend,
    open24Hours: values.length || Object.keys(values).length ? values.hasOwnProperty('open24Hours') ? values.open24Hours : initialData.open24Hours : initialData.open24Hours,
    isKosher: values.length || Object.keys(values).length ? values.hasOwnProperty('isKosher') ? values.isKosher : initialData.isKosher : initialData.isKosher,
    isAccessable: values.length || Object.keys(values).length ? values.hasOwnProperty('isAccessable') ? values.isAccessable : initialData.isAccessable : initialData.isAccessable,
    phoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('phoneNumber') ? values.phoneNumber : initialData.phoneNumber : initialData.phoneNumber,
    contactPersonName: values.length || Object.keys(values).length ? values.hasOwnProperty('contactPersonName') ? values.contactPersonName : initialData.contactPersonName : initialData.contactPersonName,
    contactPersonPhoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('contactPersonPhoneNumber') ? values.contactPersonPhoneNumber : initialData.contactPersonPhoneNumber : initialData.contactPersonPhoneNumber,
    email: values.length || Object.keys(values).length ? values.hasOwnProperty('email') ? values.email : initialData.email : initialData.email,
    emailAddress: values.length || Object.keys(values).length ? values.hasOwnProperty('emailAddress') ? values.emailAddress : initialData.emailAddress : initialData.emailAddress,
    facebookPageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('facebookPageUrl') ? values.facebookPageUrl : initialData.facebookPageUrl : initialData.facebookPageUrl,
    instagramPageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('instagramPageUrl') ? values.instagramPageUrl : initialData.instagramPageUrl : initialData.instagramPageUrl,
    youtubePageUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('youtubePageUrl') ? values.youtubePageUrl : initialData.youtubePageUrl : initialData.youtubePageUrl,
    locationName: values.length || Object.keys(values).length ? values.hasOwnProperty('locationName') ? values.locationName : initialData.locationName : initialData.locationName,
    point: values.length || Object.keys(values).length && values.hasOwnProperty('locationInfo') && values.locationInfo.hasOwnProperty("coordinates") ? values.locationInfo.coordinates : values.hasOwnProperty("location") ? values.location.coordinates : initialData.point,
    free: values.length || Object.keys(values).length ? values.hasOwnProperty('free') ? values.free : initialData.free : initialData.free,
    openHour: values.length || Object.keys(values).length ? values.hasOwnProperty('openHour') ? values.openHour.length < 7 ? new Date(values.openHour + ' 2016-01-01') : values.openHour : initialData.openHour : initialData.openHour,
    endDate: values.length || Object.keys(values).length ? values.hasOwnProperty('endDate') ? values.endDate : initialData.endDate : initialData.endDate,
    startDate: values.length || Object.keys(values).length ? values.hasOwnProperty('startDate') ? values.startDate : initialData.startDate : initialData.startDate,
    price: values.length || Object.keys(values).length ? values.hasOwnProperty('price') ? values.price : initialData.price : initialData.price,
    online: values.length || Object.keys(values).length ? values.hasOwnProperty('online') ? values.online : initialData.online : initialData.online,
    onlineMeetingURL: values.length || Object.keys(values).length ? values.hasOwnProperty('onlineMeetingURL') ? values.onlineMeetingURL : initialData.onlineMeetingURL : initialData.onlineMeetingURL,
    reservationCenterPhone: values.length || Object.keys(values).length ? values.hasOwnProperty('reservationCenterPhone') ? values.reservationCenterPhone : initialData.reservationCenterPhone : initialData.reservationCenterPhone,
    reservationCenterEmail: values.length || Object.keys(values).length ? values.hasOwnProperty('reservationCenterEmail') ? values.reservationCenterEmail : initialData.reservationCenterEmail : initialData.reservationCenterEmail,
    websitesUrl: values.length || Object.keys(values).length ? values.hasOwnProperty('websitesUrl') && values.websitesUrl !== undefined && values.websitesUrl[0] !== undefined ? values.websitesUrl[0] : initialData.websitesUrl : initialData.websitesUrl,
    whatsAppPhoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('whatsAppPhoneNumber') ? values.whatsAppPhoneNumber : initialData.whatsAppPhoneNumber : initialData.whatsAppPhoneNumber,
    registrationLink: values.length || Object.keys(values).length ? values.hasOwnProperty('registrationLink') ? values.registrationLink : initialData.registrationLink : initialData.registrationLink,
    activitiesInPlace: values.length || Object.keys(values).length ? values.hasOwnProperty('activitiesInPlace') ? values.activitiesInPlace : initialData.activitiesInPlace : initialData.activitiesInPlace,
    exclusiveFor: values.length || Object.keys(values).length ? values.hasOwnProperty('exclusiveFor') ? values.exclusiveFor : initialData.exclusiveFor : initialData.exclusiveFor,
    shady: values.length || Object.keys(values).length ? values.hasOwnProperty('shady') ? values.shady : initialData.shady : initialData.shady,
    arrivalRecommendations: values.length || Object.keys(values).length ? values.hasOwnProperty('arrivalRecommendations') ? values.arrivalRecommendations : initialData.arrivalRecommendations : initialData.arrivalRecommendations,
    tip: values.length || Object.keys(values).length ? values.hasOwnProperty('tip') ? values.tip : initialData.tip : initialData.tip,
    inPlace: values.length || Object.keys(values).length ? values.hasOwnProperty('inPlace') && values.inPlace.enum === undefined ? values.inPlace : initialData.inPlace : initialData.inPlace,
    prefferedSeason: values.length || Object.keys(values).length ? values.hasOwnProperty('prefferedSeason') && values.prefferedSeason.enum === undefined ? values.prefferedSeason : initialData.prefferedSeason : initialData.prefferedSeason,
    time: values.length || Object.keys(values).length ? values.hasOwnProperty('time') ? values.time : initialData.time : initialData.time,
    tagId: values.length || Object.keys(values).length ? values.hasOwnProperty('tagId') ? values.tagId : initialData.tagId : initialData.tagId,
    categoryId: values.length || Object.keys(values).length ? values.hasOwnProperty('categoryId') ? values.categoryId : initialData.categoryId : initialData.categoryId,
    isRecommended: values.length || Object.keys(values).length ? values.hasOwnProperty('isRecommended') ? values.isRecommended : initialData.isRecommended : initialData.isRecommended,
    isHidden: values.length || Object.keys(values).length ? values.hasOwnProperty('isHidden') ? values.isHidden : initialData.isHidden : initialData.isHidden,
    pois: values.length || Object.keys(values).length ? values.hasOwnProperty('pois') ? values.pois : initialData.pois : initialData.pois,
    objectIds: values.length || Object.keys(values).length ? values.hasOwnProperty('objectIds') ? values.objectIds.map(item => item.id) : initialData.objectIds : initialData.objectIds,
    coverImageFileId: values.length || Object.keys(values).length ? values.hasOwnProperty('coverImageFileId') ? values.coverImageFileId : initialData.coverImageFileId : initialData.coverImageFileId,
    productIncludes: values.length || Object.keys(values).length ? values.hasOwnProperty('productIncludes') ? values.productIncludes : initialData.productIncludes : initialData.productIncludes,
    style: values.length || Object.keys(values).length ? values.hasOwnProperty('style') ? values.style : initialData.style : initialData.style,
    shipmentType: values.length || Object.keys(values).length ? values.hasOwnProperty('shipmentType') ? values.shipmentType : initialData.shipmentType : initialData.shipmentType,
    sizeAndDimension: values.length || Object.keys(values).length ? values.hasOwnProperty('sizeAndDimension') ? values.sizeAndDimension : initialData.sizeAndDimension : initialData.sizeAndDimension,
    productComponents: values.length || Object.keys(values).length ? values.hasOwnProperty('productComponents') ? values.productComponents : initialData.productComponents : initialData.productComponents,
    useageRestrictions: values.length || Object.keys(values).length ? values.hasOwnProperty('useageRestrictions') ? values.useageRestrictions : initialData.useageRestrictions : initialData.useageRestrictions,
    inStock: values.length || Object.keys(values).length ? values.hasOwnProperty('inStock') ? values.inStock : initialData.inStock : initialData.inStock,
    galleryFileIds: values.length || Object.keys(values).length ? values.hasOwnProperty('galleryFileIds') ? values.galleryFileIds : initialData.galleryFileIds : initialData.galleryFileIds,
    approveContent: values.length || Object.keys(values).length ? values.hasOwnProperty('approveContent') ? values.approveContent : initialData.approveContent : initialData.approveContent,
    roles: values.length || Object.keys(values).length ? values.hasOwnProperty('roles') ? values.roles.map(role => role.roleId) : initialData.roles : initialData.roles,
    isPremium: values.length || Object.keys(values).length ? values.hasOwnProperty('isPremium') ? values.isPremium : initialData.isPremium : initialData.isPremium,
  }

  return returnValues
}


const getTagsForForm = (recievedTags, allTags) => {
  if (recievedTags && allTags && recievedTags.length > 0 && allTags.length > 0) {
    let selectedTags = recievedTags.map(item => (
      item._id
    ))
    selectedTags = allTags.filter(item => (
      selectedTags.includes(item.id)
    ))
    selectedTags = selectedTags.map(item => {
      return item.id
    })
    return selectedTags
  }
  return []
}

export const getTagIdsToSend = (tagCategoryIds, areaSpecificData) => {
  let x = areaSpecificData.tagsIds.filter(item => tagCategoryIds.includes(item.id))
  x = x.map(item => {
    return item.id
  })
  return x
}