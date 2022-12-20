import { Flex, Select, Text } from '@chakra-ui/react'
import React, { ChangeEventHandler } from 'react'


type Props = {
    onChange: ChangeEventHandler<HTMLSelectElement>,
    options: string[]
    value: string,
    label: string,

}



const FSelect = (props: Props) => {
    return (
        //<Field as='select' id={props.name} name={props.name}
        <Flex mb='20px'>
        <Text mr='10px'>{props.label}: </Text>
        <Select
            value={props.value}
            onChange={props.onChange}
        >
            {props.options.map((option) => {
                return <option key={option} value={option}>{option}</option>
            })}
        </Select>
        </Flex>
        
    )
}

export default FSelect