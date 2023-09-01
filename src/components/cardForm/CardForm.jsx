import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormContainer,
  ModalTitle,
  Input,
  Textarea,
  Subtitle,
  Text,
  ColorOptionLabel,
  DeadlineBox,
} from './CardForm.styled';
import BtnAdd from 'components/ScreensPage/btnAdd/BtnAdd';
import ModalClose from '@mui/joy/ModalClose';
import { Calendar } from 'components/calendar/Calendar';
import dayjs from 'dayjs';

const CardForm = ({
  title,
  text,
  priority,
  deadline,
  formTitle,
  btnText,
  onSubmit,
  owner,
}) => {
  const [selectedDate, setSelectedDate] = useState();
  const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');

  const initialValues = {
    title: '',
    text: '',
    priority: '',
    deadline: '',
  };

  const handleSubmit = values => {
    const data = {
      ...values,
      owner,
    };

    onSubmit(data);
  };

  return (
    <FormContainer>
      <ModalClose
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1,
        }}
      />
      <ModalTitle>{formTitle}</ModalTitle>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field type="text" name="title" as={Input} placeholder="Title" />
          <Field
            type="text"
            name="description"
            as={Textarea}
            placeholder="Description"
          />
          <div>
            <Subtitle>Label color</Subtitle>
            <div>
              <ColorOptionLabel className="blue">
                <Field type="radio" name="priority" value="low" />
              </ColorOptionLabel>
              <ColorOptionLabel className="red">
                <Field type="radio" name="priority" value="medium" />
              </ColorOptionLabel>
              <ColorOptionLabel className="green">
                <Field type="radio" name="priority" value="high" />
              </ColorOptionLabel>
              <ColorOptionLabel className="gray">
                <Field type="radio" name="priority" value="without" />
              </ColorOptionLabel>
            </div>
          </div>
          <div>
            <Subtitle>Deadline</Subtitle>
            <DeadlineBox>
              <Text>
                {selectedDate
                  ? formattedDate
                  : `Today, ${dayjs().format('MMMM D')}`}
              </Text>
              <Calendar
                parentState={setSelectedDate}
                initial={initialValues.deadline}
              />
            </DeadlineBox>
          </div>
          <BtnAdd btnTitle={btnText} btnColor={'#BEDBB0'} />
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default CardForm;
