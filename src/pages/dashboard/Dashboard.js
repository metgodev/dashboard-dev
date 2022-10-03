import React, { useEffect, useState } from "react";
// MUI
import { Box, Grid } from "@material-ui/core";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Calendar from "../../components/Calendar/Calendar";
import BigChart from "../../components/BigChart/BigChart";
import BigStat from "../../components/BigStat/BigStat";
import term from "../../terms";
import config from "../../config";
import MetroStats from "../../components/MetroStats/MetroStats";
import Download from "../../components/Download/Download";
//Service
import useGetService from '../../hooks/useGetService'
//Helper
import { getWeeklyActiveUsers, headerBtns, requestParams } from "./dashboardHelpers";
import { sortDataForMap } from "../maps/mapsHelpers";
import BACK_ROUTES from '../../data/back_routes'
import CACHED_DATA_ROUTES from '../../data/cached_data_routes'
import AdminNotifications from "../../components/AdminNotifications/AdminNotifications";
import { useSelector } from "react-redux";
import GetPermissions from "../../hooks/GetPermissions";
import client from '../../API/metro'
import useGetWindowSize from '../../hooks/useGetWindowSize'

export default function Dashboard() {

  const permissions = GetPermissions()
  const adminNotification = useSelector(s => s.mainReducer.adminNotification)

  const [entitiesCount, setEntitiesCount] = useState({
    businesses: [],
    events: [],
    points: [],
    tracks: []
  })

  const [tagCategoriesData, setTagCategoriesData] = useState(null)
  const [users, setUsers] = useState(null)
  const { height, width } = useGetWindowSize()

  const businesses = useGetService(BACK_ROUTES.BUSINESS, CACHED_DATA_ROUTES.DASH_MAP_BUSINESSES, requestParams)
  const events = useGetService(BACK_ROUTES.EVENTS, CACHED_DATA_ROUTES.DASH_MAP_EVENTS, requestParams)
  const points = useGetService(BACK_ROUTES.POINTS, CACHED_DATA_ROUTES.DASH_MAP_POINTS, requestParams)
  const tracks = useGetService(BACK_ROUTES.TRACKS, CACHED_DATA_ROUTES.DASH_MAP_TRACKS, requestParams)
  const products = useGetService(BACK_ROUTES.PRODUCTS, CACHED_DATA_ROUTES.PRODUCTS_MAP_TRACKS, requestParams)

  useEffect(() => {
    if (!businesses.loading && !events.loading && !points.loading && !tracks.loading) {
      setEntitiesCount({ businesses: businesses.data, events: events.data, points: points.data, tracks: tracks.data })
      sortDataForMap(businesses, events, points, setTagCategoriesData)
    }
  }, [businesses, events, points, tracks])

  useEffect(() => {
    (async () => {
      const getUsers = await getWeeklyActiveUsers()
      if (getUsers && getUsers.data) {
        setUsers(getUsers)
      }
    })()
  }, [])

  return (
    <Box style={{ width: '100%', height: 'calc(100% - 70px)', display: 'flex', flexDirection: 'column' }}>
      {permissions?.adminNotification &&
        <AdminNotifications open={adminNotification} />
      }
      <PageTitle title={term('dashboard')} />
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: 5, height: '100%' }}>
        <Grid spacing={1} container style={{ display: 'flex', flexDirection: 'row', justifyContent: width > 1280 ? 'space-between' : 'center', width: '100%' }}>
          <Grid item style={{ width: '50%' }} xs={12} lg={6}>
            <Calendar events={events} type={1} warp={true} />
          </Grid>
          <Grid item style={{ width: '50%' }} xs={12} lg={6}>
            <BigChart data={users} />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {config.bigStat.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.product}>
              <BigStat
                type={term(stat.product)}
                data={entitiesCount[stat.product]}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container
          spacing={2}
          justifyContent={'space-between'}
        >
          {config.MetroStats.map(stat => (
            <Grid item lg={1} md={4} sm={6} xs={12} key={stat.product} style={{ width: '100%' }}>
              <MetroStats
                ammount={tagCategoriesData === null ? 0 : tagCategoriesData[stat.svg].length}
                svg={stat.svg}
                title={stat.product}
                clickable={false}
              />
            </Grid>
          ))}
          {/* <Grid item lg={2} md={12} sm={12} xs={12}>
            <Download />
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}


