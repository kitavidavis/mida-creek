import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  SimpleGrid,
  Paper,
  Box,
  Grid,
  Container,
  Group,
  ActionIcon,
  CloseButton,
  RingProgress,
  Center,
  HoverCard,
  ColorSwatch,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { MapContainer, TileLayer, GeoJSON, LayersControl,  useMap, useMapEvents } from 'react-leaflet'
import Kilifi2022 from "./Kilifi2022";
import Kilifi2018 from './Kilifi2018';
import Kilifi2016 from './Kilifi2016';
import Kilifi2020 from './Kilifi2020';
import kanagoni from "./kanagoni";
import kibaoni from "./kibaoni";
import midaCreek from "./mida-creek";
import mtwapaCreek from "./mtwapa-creek";
import ngomeni from "./ngomeni";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement,
  } from 'chart.js';
  import { Line, Bar } from 'react-chartjs-2';
import { ChartInfographic, Help } from 'tabler-icons-react';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  );
  
  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
  
      title: {
        display: false,
        text: 'Mida Creek Data Analysis',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { height, width } = useViewportSize();
  const labels = ["Other Vegetation", "Bare Land", "Water", "Mangroves"]
  const [data2016, setData2016] = useState([178, 800, 884, 1486]);
  const [data2018, setData2018] = useState([145, 857, 890, 1456]);
  const [data2020, setData2020] = useState([147, 946, 807, 1448]);
  const [data2022, setData2022] = useState([114, 721, 1083, 1431]);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState([-3.365315,39.963263])

  const ZoomComponent = () => {
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoom(mapEvents.getZoom());
        },
        moveend: () => {
          let el = mapEvents.getCenter();
          setCenter([el.lat, el.lng])
        },
        mouseover: (e) => {
          console.log(e.target);
        }
    });


    return null
}

  const HelpPanel = () => {
    return (
        <div  className='leaflet-top leaflet-right'>
        <div className="leaflet-control leaflet-bar">
        <HoverCard width={200}>
            <HoverCard.Target>
            <ActionIcon>
                <Help />
            </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
            <Text size="xs" color="dimmed">
                Legend:
            </Text>
            <Group spacing={3} >
                <ColorSwatch size={10} color={theme.colors.yellow[9]} />
                <Text color="dimmed"  size='xs' >Other Vegetation</Text>
                </Group>
                <Group spacing={3} >
                <ColorSwatch size={10} color={theme.colors.red[9]} />
                <Text color="dimmed"  size='xs' >Bare Land</Text>
                </Group>
                <Group spacing={3} >
                <ColorSwatch size={10} color={theme.colors.blue[9]} />
                <Text color="dimmed"  size='xs' >Water</Text>
                </Group>
                <Group spacing={3} >
                <ColorSwatch size={10} color={theme.colors.green[9]} />
                <Text color="dimmed"  size='xs' >Mangroove</Text>
                </Group>
            </HoverCard.Dropdown>
        </HoverCard>
        </div>
        </div>
    )
}

  const chart2022 = {
    labels,
    datasets: [
      {
        label: 'Area(Ha)',
        data: data2022,
        borderColor: theme.colors.green[9],
        backgroundColor: theme.colors.green[9],
      },
    ],
  };

  const Legend2022 = () => {
    return (
        <div  className='leaflet-top leaflet-left'>
        <div className="leaflet-control leaflet-bar">
        <HoverCard width={200}>
            <HoverCard.Target>
            <ActionIcon>
                <ChartInfographic />
            </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
    <Container sx={(theme) => ({margin: 0, padding: 0})} size={250}>
    <Container size={250} sx={(theme) => ({
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
    height: 150,
    width: 250,
    })} >
        <Paper sx={(theme) => ({
        height: '100%',
        width: '100%',
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
        })}>
            <Text mb={5} size="xs" color="dimmed">
                Mida Creek 2022
            </Text>
            <Bar data={chart2022} options={options} />
            </Paper>
    </Container>
    </Container>
    </HoverCard.Dropdown>
    </HoverCard>
    </div>
    </div>
    )
}

const Mangrove2022 = () => {
    return (
        <Container sx={(theme) => ({margin: 0, padding: 0})} size={160} className='leaflet-bottom leaflet-right'>
        <Container size={160} className="leaflet-control leaflet-bar" sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
        height: 130,
        width: 160,
        })} >
            <Paper sx={(theme) => ({
            height: '100%',
            width: '100%',
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
            })}>
                <Text mb={10} weight={500} size="sm">Area(Ha)</Text>
                <Text mb={5} size="xs" color="dimmed">
                    Mangroves: <span style={{color: theme.colors.green[9]}}>{data2022[3]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Bare Land: <span style={{color: theme.colors.red[9]}}>{data2022[1]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Water: <span style={{color: theme.colors.blue[9]}}>{data2022[2]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Other Vegetation: <span style={{color: theme.colors.yellow[9]}}>{data2022[0]}</span>
                </Text>
                </Paper>
        </Container>
        </Container>
    )
}

  const MapPanel2022 = () => {
    return (
        <MapContainer zoomControl={false} style={{height: '100%', width: '100%', backgroundColor: '#101113'}} center={center} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON data={Kilifi2022} style={(feature) => {
            return {
                color: feature.properties.VALUE === 3.0 ? "red" : feature.properties.VALUE === 6.0 ? "transparent" : feature.properties.VALUE === 2.0 ? "blue" : "green",
                fillColor:feature.properties.VALUE === 3.0 ? "red" : feature.properties.VALUE === 6.0 ? "yellow" : feature.properties.VALUE === 2.0 ? "blue" : "green",
            }
        }} />
        <Legend2022 />
        <Mangrove2022 />
        <HelpPanel />
        <ZoomComponent />
        <GeoJSON data={kanagoni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={kibaoni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={midaCreek} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={mtwapaCreek} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={ngomeni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />
      </MapContainer>
    )
}

const chart2018 = {
    labels,
    datasets: [
      {
        label: 'Area(Ha)',
        data: data2018,
        borderColor: theme.colors.green[9],
        backgroundColor: theme.colors.green[9],
      },
    ],
  };

  const Legend2018 = () => {
    return (
        <div  className='leaflet-top leaflet-left'>
        <div className="leaflet-control leaflet-bar">
        <HoverCard width={200}>
            <HoverCard.Target>
            <ActionIcon>
                <ChartInfographic />
            </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
    <Container sx={(theme) => ({ margin: 0, padding: 0})} size={250}>
    <Container size={250} sx={(theme) => ({
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
    height: 150,
    width: 250,
    })} >
        <Paper sx={(theme) => ({
        height: '100%',
        width: '100%',
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
        })}>
            <Text mb={5} size="xs" color="dimmed">
                Mida Creek 2018
            </Text>
            <Bar data={chart2018} options={options} />
            </Paper>
    </Container>
    </Container>
    </HoverCard.Dropdown>
    </HoverCard>
    </div>
    </div>
    )
}

const Mangrove2018 = () => {
    return (
        <Container sx={(theme) => ({margin: 0, padding: 0})} size={160} className='leaflet-bottom leaflet-right'>
        <Container size={160} className="leaflet-control leaflet-bar" sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
        height: 130,
        width: 160,
        })} >
            <Paper sx={(theme) => ({
            height: '100%',
            width: '100%',
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
            })}>
                <Text mb={10} weight={500} size="sm">Area(Ha)</Text>
                <Text mb={5} size="xs" color="dimmed">
                    Mangroves: <span style={{color: theme.colors.green[9]}}>{data2018[3]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Bare Land: <span style={{color: theme.colors.red[9]}}>{data2018[1]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Water: <span style={{color: theme.colors.blue[9]}}>{data2018[2]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Other Vegetation: <span style={{color: theme.colors.yellow[9]}}>{data2018[0]}</span>
                </Text>
                </Paper>
        </Container>
        </Container>
    )
}

const MapPanel2018 = () => {
    return (
        <MapContainer zoomControl={false} style={{height: '100%', width: '100%', backgroundColor: '#101113'}} center={center} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON data={Kilifi2018} style={(feature) => {
            return {
                color: feature.properties.VALUE === 3.0 ? "red" : feature.properties.VALUE === 6.0 ? "transparent" : feature.properties.VALUE === 2.0 ? "blue" : "green",
                fillColor:feature.properties.VALUE === 3.0 ? "red" : feature.properties.VALUE === 6.0 ? "yellow" : feature.properties.VALUE === 2.0 ? "blue" : "green",
            }
        }} />
        <Legend2018 />
        <Mangrove2018 />
        <HelpPanel />
        <ZoomComponent />

        <GeoJSON data={kanagoni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={kibaoni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={midaCreek} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={mtwapaCreek} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={ngomeni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />
      </MapContainer>
    )
}

const chart2016 = {
    labels,
    datasets: [
      {
        label: 'Area(Ha)',
        data: data2016,
        borderColor: theme.colors.green[9],
        backgroundColor: theme.colors.green[9],
      },
    ],
  };

  const Legend2016 = () => {
    return (
        <div  className='leaflet-top leaflet-left'>
        <div className="leaflet-control leaflet-bar">
        <HoverCard width={200}>
            <HoverCard.Target>
            <ActionIcon>
                <ChartInfographic />
            </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
    <Container sx={(theme) => ({margin: 0, padding: 0})} size={250}>
    <Container size={250} sx={(theme) => ({
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
    height: 150,
    width: 250,
    })} >
        <Paper sx={(theme) => ({
        height: '100%',
        width: '100%',
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
        })}>
            <Text mb={5} size="xs" color="dimmed">
                Mida Creek 2016
            </Text>
            <Bar data={chart2016} options={options} />
            </Paper>
    </Container>
    </Container>
    </HoverCard.Dropdown>
    </HoverCard>
    </div>
    </div>
    )
}

const Mangrove2016 = () => {
    return (
        <Container sx={(theme) => ({margin: 0, padding: 0})} size={160} className='leaflet-bottom leaflet-right'>
        <Container size={160} className="leaflet-control leaflet-bar" sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
        height: 130,
        width: 160,
        })} >
            <Paper sx={(theme) => ({
            height: '100%',
            width: '100%',
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
            })}>
                <Text mb={10} weight={500} size="sm">Area(Ha)</Text>
                <Text mb={5} size="xs" color="dimmed">
                    Mangroves: <span style={{color: theme.colors.green[9]}}>{data2016[3]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Bare Land: <span style={{color: theme.colors.red[9]}}>{data2016[1]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Water: <span style={{color: theme.colors.blue[9]}}>{data2016[2]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Other Vegetation: <span style={{color: theme.colors.yellow[9]}}>{data2016[0]}</span>
                </Text>
                </Paper>
        </Container>
        </Container>
    )
}

const MapPanel2016 = () => {
    return (
        <MapContainer zoomControl={false} style={{height: '100%', width: '100%', backgroundColor: '#101113'}} center={center} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
                <GeoJSON data={Kilifi2016} style={(feature) => {
            return {
                color: feature.properties.VALUE === 3.0 ? "red" : feature.properties.VALUE === 6.0 ? "transparent" : feature.properties.VALUE === 2.0 ? "blue" : "green",
                fillColor:feature.properties.VALUE === 3.0 ? "red" : feature.properties.VALUE === 6.0 ? "yellow" : feature.properties.VALUE === 2.0 ? "blue" : "green",
            }
        }} />
        <Legend2016 />
        <Mangrove2016 />
        <HelpPanel />
        <ZoomComponent />

        <GeoJSON data={kanagoni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={kibaoni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={midaCreek} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={mtwapaCreek} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={ngomeni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />
      </MapContainer>
    )
}

const chart2020 = {
    labels,
    datasets: [
      {
        label: 'Area(Ha)',
        data: data2020,
        borderColor: theme.colors.green[9],
        backgroundColor: theme.colors.green[9],
      },
    ],
  };

  const Legend2020 = () => {
    return (
        <div  className='leaflet-top leaflet-left'>
        <div className="leaflet-control leaflet-bar">
        <HoverCard width={200}>
            <HoverCard.Target>
            <ActionIcon>
                <ChartInfographic />
            </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
    <Container sx={(theme) => ({margin: 0, padding: 0})} size={250}>
    <Container size={250} sx={(theme) => ({
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
    height: 150,
    width: 250,
    })} >
        <Paper sx={(theme) => ({
        height: '100%',
        width: '100%',
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
        })}>
            <Text mb={5} size="xs" color="dimmed">
                Mida Creek 2020
            </Text>
            <Bar data={chart2020} options={options} />
            </Paper>
    </Container>
    </Container>
    </HoverCard.Dropdown>
    </HoverCard>
    </div>
    </div>
    )
}

const Mangrove2020 = () => {
    return (
        <Container sx={(theme) => ({margin: 0, padding: 0})} size={160} className='leaflet-bottom leaflet-right'>
        <Container size={160} className="leaflet-control leaflet-bar" sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
        height: 130,
        width: 160,
        })} >
            <Paper sx={(theme) => ({
            height: '100%',
            width: '100%',
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]  : "#ffff",
            })}>
                <Text mb={10} weight={500} size="sm">Area(Ha)</Text>
                <Text mb={5} size="xs" color="dimmed">
                    Mangroves: <span style={{color: theme.colors.green[9]}}>{data2020[3]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Bare Land: <span style={{color: theme.colors.red[9]}}>{data2020[1]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Water: <span style={{color: theme.colors.blue[9]}}>{data2020[2]}</span>
                </Text>
                <Text mb={5} size="xs" color="dimmed">
                    Other Vegetation: <span style={{color: theme.colors.yellow[9]}}>{data2020[0]}</span>
                </Text>

                </Paper>
        </Container>
        </Container>
    )
}

const MapPanel2020 = () => {
    return (
        <MapContainer zoomControl={false} style={{height: '100%', width: '100%', backgroundColor: '#101113'}} center={center} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        <GeoJSON data={Kilifi2020} style={(feature) => {
            return {
                color: feature.properties.VALUE === 3.0 ? "red" : feature.properties.VALUE === 6.0 ? "transparent" : feature.properties.VALUE === 2.0 ? "blue" : "green",
                fillColor:feature.properties.VALUE === 3.0 ? "red" : feature.properties.VALUE === 6.0 ? "yellow" : feature.properties.VALUE === 2.0 ? "blue" : "green",
            }
        }} />
        <Legend2020 />
        <Mangrove2020 />
        <HelpPanel />
        <ZoomComponent />

        <GeoJSON data={kanagoni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={kibaoni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={midaCreek} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={mtwapaCreek} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />

<GeoJSON data={ngomeni} style={(f, l) => {
          return {
            color: "red",
            fillColor: "red",
            opacity: 1
          }
        }} />
      </MapContainer>
    )
}

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
    >

<Grid columns={24}>
        <Grid.Col md={24} lg={12}>
        <Box style={{height: (height - 70) / 2, marginBottom: 2}} >
          <MapPanel2016 />
      </Box >
        </Grid.Col>
        <Grid.Col md={24} lg={12}>
        <Box style={{height: (height - 70) / 2, marginBottom: 2}} >
          <MapPanel2018 />
      </Box >
        </Grid.Col>
      </Grid>
        <Grid columns={24}>

          <Grid.Col md={24} lg={12}>
          <Box style={{height: (height - 70) / 2, marginTop: 20}}>
          <MapPanel2020 />
            </Box>
          </Grid.Col>
          <Grid.Col style={{height: '100%'}}md={24} lg={12}>
          <Box style={{height: (height - 70) / 2, marginTop: 20,}}>
          <MapPanel2022 />
            </Box>
          </Grid.Col>
        </Grid>
    </AppShell>
  );
}