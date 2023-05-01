import React from 'react';
import { ConversationalForm } from 'conversational-form';
import jsPDF from 'jspdf';


export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.formFields = [
      {
        tag: 'input',
        type: 'text',
        name: 'firstname',
        'cf-questions': 'What is your firstname?',
      },
      {
        tag: 'input',
        type: 'text',
        name: 'lastname',
        'cf-questions': 'What is your lastname?',
      },
      {
        tag: 'input',
        type: 'number',
        name: 'phone',
        'cf-questions': 'What is your number?',
      },
      {
        tag: 'input',
        type: 'email',
        name: 'email',
        'cf-questions': 'What is your email?',
      },
      {
        tag: 'input',
        type: 'submit',
        name: 'confirm',
        'cf-questions': 'Excellent! I have received all the required information, thank you.',
      },
    ];
    
    this.submitCallback = this.submitCallback.bind(this);
  }


  componentDidMount() {
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        preventAutoFocus: true,
        // loadExternalStyleSheet: false
      },
      tags: this.formFields,
    });
    this.elem.appendChild(this.cf.el);
  }

  submitCallback() {
    var formDataSerialized = this.cf.getFormData(true);
    console.log('Formdata, obj:', formDataSerialized);
    this.cf.addRobotChatResponse(
      'You are done. Check the dev console for form data output.'
    );

    // Generate PDF from form data
    const doc = new jsPDF();
    doc.text(20, 20, 'Form Data:');
    doc.text(20, 30, JSON.stringify(formDataSerialized, null, 2));
    doc.save('form-data.pdf');

    // Display message to user
    window.alert('Your form has been submitted and the data has been saved as a PDF file.');
  }

  render() {
    return (
      <div>
        <div ref={(ref) => (this.elem = ref)} />
      </div>
    );
  }
}
