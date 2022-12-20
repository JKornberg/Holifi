import { Button, Center, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { json } from 'stream/consumers'
import NavBar from '../../common/components/Header/Navbar'
import { firestore } from '../../common/utils/firebase/clientApp'
import { useAuth } from '../../contexts/AuthContext'

type Props = {}

const ManagePage = (props: Props) => {
  const [makeAdminInput, setMakeAdminInput] = useState('')
  const [removeAdminInput, setRemoveAdminInput] = useState('')
  const { loadingUser } = useAuth();

  const submitAdminRequest = async (isGrant: boolean) => {
    console.log(JSON.stringify({ 'isGrant': isGrant, 'email': isGrant ? makeAdminInput : removeAdminInput }))
    const response = await fetch('/api/admin/grant', {
      method: 'POST',
      body: JSON.stringify({ 'isGrant': isGrant, 'email': isGrant ? makeAdminInput : removeAdminInput }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json()
    console.log(data);
  }


  return (
    <>
      <NavBar bg='white'></NavBar>
      <Center><Heading>Admin Management</Heading></Center>
      <VStack>
        <VStack>
          <Text w='full'>Make User Admin: </Text>
          <HStack>
            <Input bg='white'
              defaultValue={makeAdminInput}
              onChange={(event) => {
                setMakeAdminInput(event.target.value);
              }} />
            <Button
              onClick={() => {
                if (loadingUser.user?.email != null) {
                  submitAdminRequest(true);
                }
              }}
            >Submit</Button>
          </HStack>
        </VStack>
        <VStack>
          <Text w='full'>Remove User Admin: </Text>

          <HStack>
            <Input bg='white'
              defaultValue={removeAdminInput}
              onChange={(event) => {
                setRemoveAdminInput(event.target.value);
              }} />
            <Button
              onClick={() => {
                if (loadingUser.user?.email != null) {
                  submitAdminRequest(false);
                }
              }}>
              Submit
            </Button>
          </HStack>
        </VStack>
        <Button
          onClick={async () => {

            await setDoc(doc(firestore, "configurations", "v3"), config);
            console.log("Done updating config");

          }}
        >Update Config using Code</Button>
      </VStack>
    </>

  )
}

export default ManagePage



const config = {
  "processes": {
    "SLA": [
      {
        "colors": [
          "Black"
        ],
        "material": "Black",
        "resolutions": [
          "0.100mm",
          "0.050mm",
          "0.025mm"
        ]
      },
      {
        "colors": [
          "Gray"
        ],
        "resolutions": [
          "0.100mm",
          "0.050mm",
          "0.025mm"
        ],
        "material": "Gray"
      },
      {
        "colors": [
          "White"
        ],
        "material": "White",
        "resolutions": [
          "0.100mm",
          "0.050mm",
          "0.025mm"
        ]
      },
      {
        "colors": [
          "Clear",
          "Black-Dyed"
        ],
        "material": "Clear",
        "resolutions": [
          "0.100mm",
          "0.050mm",
          "0.025mm"
        ]
      },
      {
        "material": "High-Temp",
        "resolutions": [
          "0.100mm",
          "0.050mm"
        ],
        "colors": [
          "Clear",
          "Black-Dyed"
        ]
      },
      {
        "resolutions": [
          "0.100mm",
          "0.050mm"
        ],
        "material": "Rigid",
        "colors": [
          "White"
        ]
      },
      {
        "colors": [
          "Gray"
        ],
        "resolutions": [
          "0.100mm",
          "0.050mm"
        ],
        "material": "Tough"
      },
      {
        "material": "Durable",
        "resolutions": [
          "0.100mm",
          "0.050mm"
        ],
        "colors": [
          "Opaque"
        ]
      },
      {
        "resolutions": [
          "0.100mm",
          "0.050mm"
        ],
        "colors": [
          "Opaque",
          "Black-Dyed"
        ],
        "material": "Elastic (50A)"
      },
      {
        "resolutions": [
          "0.100mm",
          "0.050mm"
        ],
        "colors": [
          "Black",
          "Clear"
        ],
        "material": "Flexible (80A)"
      }
    ],
    "SLS": [
      {
        "colors": [
          "Gray",
          "Black-Dyed"
        ],
        "resolutions": [
          "0.100mm",
          "0.050mm",
          "0.025mm"
        ],
        "material": "Nylon 11"
      },
      {
        "resolutions": [
          "0.100mm",
          "0.050mm",
          "0.025mm"
        ],
        "material": "Nylon 12",
        "colors": [
          "Black"
        ]
      },
      {
        "colors": [
          "Black"
        ],
        "material": "Nylon 12 GF",
        "resolutions": [
          "0.100mm",
          "0.050mm",
          "0.025mm"
        ]
      }
    ]
  },
  "finishes": [
    "Standard",
    "Media Tumbled",
    "Media Blasted"
  ],
  "shipments": [
    {
      "name": "Expedited",
      "time_range": [1, 3],
      "multiplier": 1.44
    },
    {
      "name": "Standard",
      "time_range": [4, 8],
      "multiplier": 1
    },
    {
      "name": "Economy",
      "time_range": [8, 12],
      "multiplier": 0.78
    },
  ],
  "units": [
    "mm",
    "in"
  ],
  'prices': {
    'sls_windows': [
      { "range" : [0,2], "lin_coef" : -5.3, 'const_coef' : 18.007},
      { "range" : [2,4],"lin_coef" : -1.79057592, 'const_coef' : 10.67230366},
      { "range" : [4,9999], "lin_coef" : -.06608696, 'const_coef' : 3.77434783},
    ],
    'quantity_factors': {
      'lower_cutoff' : 5,
      'upper_cutoff': 100,
      'log_coef': -0.4592918844881614,
      'lin_coef': 0.002740489877025774,
      'const_coef': 3.2434983557293284,
    },
    'not_dyed_factor': .95

  }
}