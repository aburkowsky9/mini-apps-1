class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: Form1,
      fullName: '',
      email: '',
      password: '', 
      shippingAddress: '',
      phone: '', 
      creditNum: '',
      expDate: '',
      cvv: '',
      zip: ''
    }
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nextOnClick = this.nextOnClick.bind(this);
  }
  
  //methods
  handleInput(event) {
    let stateKey = event.target.className;
    let stateObj = {};
    stateObj[stateKey] = event.target.value;
    this.setState(stateObj);
  }
  
  handleSubmit(event) {
    this.setState({
      currentForm: Form1,
      fullName: '',
      email: '',
      password: '', 
      shippingAddress: '',
      phone: '', 
      creditNum: '',
      expDate: '',
      cvv: '',
      zip: ''
    });
  }
  
  nextOnClick(event) {
    event.preventDefault();
    if (this.state.currentForm.name === 'Form1') {
      this.setState({ currentForm: Form2 });
    } else if (this.state.currentForm.name === 'Form2') {
      this.setState({ currentForm: Form3 });
    } else if (this.state.currentForm.name === 'Form3') {
      this.setState({ currentForm: Purchase });
    } 
  
  }
  
  render() {
    let TagName = this.state.currentForm || Form1;
    return (
      <div>
        <TagName nextOnClick={ this.nextOnClick } handleInput={ this.handleInput } handleSubmit={this.handleSubmit } purchaseInfo={this.state} />
      </div>
    )
  }
}


const Form1 = (props) => {
  return (
    <form type="submit" value="Submit">
      <div>
        <label>Name:
        <input type="text" name="fullName" className="fullName" onChange={ (event) => props.handleInput(event) }/>
        </label>
      </div>
      <div>
        <label>Email:
        <input type="email" name="email" className="email" required onChange={ (event) => props.handleInput(event) }/>
        </label>
      </div>
      <div>
        <label>Password:
        <input type="password" name="password" className="password" onChange={ (event) => props.handleInput(event) }/>
        </label>
      </div>
      <div>
        <button onClick={ (event) => props.nextOnClick(event) }>Next</button>
      </div>
    </form>
  )
}

const Form2 = (props) => {
  return (
    <form type="submit" value="Submit">
      <div>
        <label>Shipping Address:
        <textarea rows="3" columns="10" name="shippingAddress" className="shippingAddress" onChange={ (event) => props.handleInput(event) }>
        </textarea>
        </label>
      </div>
      <div>
        <label>Phone:
        <input type="text" name="phone" className="phone" onChange={ (event) => props.handleInput(event) }/>
        </label>
      </div>
      <div>
        <button onClick={ (event) => props.nextOnClick(event) }>Next</button>
      </div>
    </form>
  )
}

const Form3 = (props) => {
  return (
    <form type="submit" value="Submit">
      <div>
        <label>Credit Card Number:
        <input type="text" name="creditNum" className="creditNum" onChange={ (event) => props.handleInput(event) }/>
        </label>
      </div>
      <div>
        <label>Exp Date:
        <input type="text" name="expDate" className="expDate" required onChange={ (event) => props.handleInput(event) }/>
        </label>
      </div>
      <div>
        <label>CVV:
        <input type="text" name="cvv" className="cvv" onChange={ (event) => props.handleInput(event) }/>
        </label>
      </div>
      <div>
        <label>Billing Zip:
        <input type="text" name="zip" className="zip" onChange={ (event) => props.handleInput(event) }/>
        </label>
      </div>
      <div>
        <button onClick={ (event) => props.nextOnClick(event) }>Next</button>
      </div>
    </form>
  )
}

const Purchase = (props) => {
  var purchaseInfo = JSON.stringify(props.purchaseInfo);
  console.log(props)
  return (
    <div>
      <h3>Click Purchase For Submission</h3>
      <form type="submit" value="Submit" action="/purchases" method="POST">
        <div>
          <label>Shipping Address:
          <textarea rows="10" columns="10" name="purchaseInfo" className="shippingAddress" onChange={ (event) => props.handleInput(event) }>{ purchaseInfo }
          </textarea>
          </label>
        </div>
        <div>
          <button onSubmit={ (event) =>  props.handleSubmit(event) }>Purchase</button>
        </div>
      </form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
