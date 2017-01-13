import React, {Component, PropTypes} from 'react';

import validator from 'validator';
import _ from 'lodash';
import areIntlLocalesSupported from 'intl-locales-supported';
import moment from 'moment';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Geosuggest from 'react-geosuggest';

import ChangePassword from './ChangePassword/ChangePassword';


import './ProfileForm.less';

class ProfileForm extends Component {

    static propTypes = {
        updateProfile: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        changePassword: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {phone: '', isPhoneValid: true, availability: '', employeeDate: '', open: true};
    }

    setAvailability = (event, availability) => this.setState({availability});

    setEmployeeDate = (event, employeeDate) => this.setState({employeeDate});

    disableWeekends = date => date.getDay() === 0 || date.getDay() === 6;

    setPhone = event => {
        const phone = event.currentTarget.value;
        this.setState({phone});
        if (validator.isMobilePhone(event.currentTarget.value, 'fr-FR')) {
            this.setState({isPhoneValid: true});
        }
    };

    checkPhone = event => {
        if (validator.isMobilePhone(event.currentTarget.value, 'fr-FR')) {
            this.setState({isPhoneValid: true});
        } else {
            this.setState({isPhoneValid: false});
        }
    };

    submitProfile = () => {
        const profile = {};
        const DATE_FORMAT = 'YYYY-MM-DD';
        const {phone, isPhoneValid, address, isAddressValid, availability, employeeDate} = this.state;
        if (isPhoneValid && phone.length > 0) {
            profile.phone = phone;
        }
        if (isAddressValid) {
            profile.address = address;
        }
        if (availability) {
            profile.availability = moment(availability).format(DATE_FORMAT);
        }
        if (employeeDate) {
            profile.employee_date = moment(employeeDate).format(DATE_FORMAT)
        }
        if (!_.isEmpty(profile)) {
            this.props.updateProfile(profile);
        }
    };

    selectAddress = suggest => {
        this.setState({
            address: {
                label: suggest.label,
                lat: suggest.location.lat,
                lng: suggest.location.lng
            },
            isAddressValid: true
        });
    };

    handleRequestClose = () => this.setState({open: false});

    render() {

        let DateTimeFormat;
        // Use the native Intl.DateTimeFormat if available, or a polyfill if not.
        if (areIntlLocalesSupported(['fr'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        } else {
            const IntlPolyfill = require('intl');
            DateTimeFormat = IntlPolyfill.DateTimeFormat;
            require('intl/locale-data/jsonp/fr');
        }

        const {phone, isPhoneValid, availability, employeeDate} = this.state;
        const errorPhone = isPhoneValid ? '' : 'Numéro invalide';
        const {user:{address, availability_date, employee_date}, user, changePassword} = this.props;
        const fixtures = [{label: 'Xebia', location: {lat: 48.8755622, lng: 2.3088289}}];
        const phoneValue = (phone || this.props.user.phone) || '';
        let date = availability ? new Date(availability) : undefined;
        if (!date && availability_date) {
            date = moment(availability_date).toDate();
        }
        let employee = employeeDate ? new Date(employeeDate) : undefined;
        if (!employeeDate && employee_date) {
            employee = moment(employee_date).toDate();
        }
        return (
            <div className="profile-form">
                <Paper style={{margin: '.5em', padding: '10px'}}>
                    <div className="content">
                        <h3>Informations personnelles</h3>
                        <div>
                            <TextField value={phoneValue} hintText="0600000000"
                                       errorText={errorPhone}
                                       floatingLabelText="Téléphone"
                                       onChange={::this.setPhone}
                                       onBlur={::this.checkPhone}/>
                        </div>
                        <div className="geosuggest-content">
                            <span className="label">Adresse d'activité</span>
                            <Geosuggest
                                placeholder="Adresse d'activité"
                                country="fr"
                                onSuggestSelect={::this.selectAddress}
                                initialValue={address ? address.label : ''}
                                fixtures={fixtures}/>
                        </div>
                        <div>
                            <DatePicker
                                DateTimeFormat={DateTimeFormat}
                                hintText="Disponible le"
                                floatingLabelText="Disponible le"
                                value={date}
                                onChange={::this.setAvailability}
                                minDate={new Date()}
                                shouldDisableDate={::this.disableWeekends}
                                locale="fr"/>
                        </div>
                        <div>
                            <DatePicker
                                DateTimeFormat={DateTimeFormat}
                                hintText="Diplômé le"
                                floatingLabelText="Diplômé le"
                                value={employee}
                                onChange={::this.setEmployeeDate}
                                shouldDisableDate={::this.disableWeekends}
                                locale="fr"/>
                        </div>
                        <div className="button">
                            <RaisedButton primary label="Sauvegarder" onClick={::this.submitProfile}/>
                        </div>
                    </div>
                </Paper>
                <ChangePassword me={user} changePassword={changePassword}/>
                <Snackbar
                    bodyStyle={{backgroundColor: '#008500'}}
                    open={this.state.open && user.updateProfile.success}
                    message="Informations sauvegardées"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}/>
            </div>
        )
    }
}

export default ProfileForm;