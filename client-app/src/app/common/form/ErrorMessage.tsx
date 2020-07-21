import { AxiosResponse } from 'axios'
import React from 'react'
import { Message } from 'semantic-ui-react'


interface IProps{
  error: AxiosResponse,
  text: string
}
const ErrorMessage: React.FC<IProps> = ({error, text}) => {
  return (
    <Message error>
      <Message.Header>
        {error.statusText}
      </Message.Header>
      {error.data && Object.keys(error.data.errors.length > 0) && (
        <Message.List>
          {Object.values(error.data.errors).flat().map((err, index) => (
            <Message.Item key={index} >{err}</Message.Item>
          ))}
        </Message.List>
      )}
     {text && <Message content={text} />}
    </Message>
  )
}

export default ErrorMessage
