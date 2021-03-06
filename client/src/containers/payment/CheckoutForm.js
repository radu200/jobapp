import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import Checkout from "../../components/payment/CheckouForm";
import CheckoutPage from "../../components/payment/CheckoutPage";
import { validate, validateEmail } from "../../Utils/validation";
import { postPayment } from "../../api/payment";
import { connect } from "react-redux";
import { fetchMembership } from "../../redux/membership/operators";
import { getMemberSelector } from "../../redux/membership/selectors";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false,
      cardName: "",
      cardEmail: "",
      formError: '',
      requestError: false,
      loading: false,
      success: false,
    };
    this.submit = this.submit.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    this.props.fetchMembership();
  }

  handleCardChange(e) {
    this.setState({
      [e.elementType]: e.complete,
    });
  }

  handleInputChange(e) {
    //  inputs value other than built in elements
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  async submit(e) {
    e.preventDefault();
    const { cardCvc, cardNumber, cardExpiry, email, cardName } = this.state;
    const emailVal = validateEmail(email);
    const cardNameVal = validate(cardName);
     console.log(this.state)
    if (
      cardNumber &&
      cardCvc &&
      cardExpiry &&
      cardNameVal.status &&
      emailVal.status
    ) {
      this.setState({ loading: true });

      const { token } = await this.props.stripe.createToken({
        name: cardName,
        email: email,
      });
      const response = await postPayment(token);
      const { status } = response;

      if (status === "success") {
        this.setState({
          loading: false,
          success: true,
          formError: '',
          requestError: false,
        });
      } else {
        this.setState({ requestError: true });
      }
    } else {
      this.setState({ formError: true });
    }
  }

  render() {
    const { formError, requestError, loading, success } = this.state;
    const { submit, handleCardChange, handleInputChange } = this;
    const { member } = this.props;
    return (
      <div className="checkout">
        <CheckoutPage
          handleSubmit={submit}
          handleCardChange={handleCardChange}
          handleInputChange={handleInputChange}
          formError={formError}
          requestError={requestError}
          loading={loading}
          success={success}
          memberMsg={member}
        />
      </div>
    );
  }
}

const mapState = state => ({
  member: getMemberSelector(state),
});

export default connect(mapState, { fetchMembership })(
  injectStripe(CheckoutForm),
);
