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

    this.state = {
      showModal: false // Initialize showModal state to false
    }

    // Bind the function to the component's context
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

    // Set state to show modal
    // this.setState({ showModal: true });
    // if(!this.setState({ showModal: true })){
    //   console.log("I've been called");
    //   this.called = true;
    // }
    this.showModal();
  }
  
  showModal() {
    if (this.modal) {
      this.modal.classList.add('show');
      this.modal.style.display = 'block';
    }
  }

  
  render() {
    return (
      <div>
        <div className="container" ref={(ref) => (this.elem = ref)} />
        {/* Confirmation modal
        {this.state.showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Your form has been submitted and the data has been saved as a PDF file.</p>
              <button onClick={() => this.setState({ showModal: false })}>Confirm</button>
            </div>
          </div>
        )} */}
        <div className="modal" tabIndex="-1" role="dialog" ref={modal => this.modal = modal} >
        <div className="modal-content">
              <p>Your form has been submitted and the data has been saved as a PDF file.</p>
              <button onClick={() => this.setState({ showModal: false })}>Confirm</button>
            </div>
        </div>
      </div>
    );
  }
}
