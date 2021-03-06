import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import AWS, {
  Config,
  CognitoIdentityServiceProvider,
} from 'aws-sdk/dist/aws-sdk-react-native';
import * as awsmobile from './aws-exports';

// Helper class to interface with Amazon Cognito

export default class CognitoHelper {
  getUserPool() {
    let self = this;
    return new CognitoUserPool({
      UserPoolId: awsmobile.aws_user_pools_id,
      ClientId: awsmobile.aws_cognito_identity_pool_id,
    });
  }
  getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }

  makeAuthDetails(username, password) {
    return new AuthenticationDetails({
      Username: username,
      Password: password,
    });
  }

  makeAttribute(name, value) {
    return new CognitoUserAttribute({
      Name: name,
      Value: value,
    });
  }

  makeUser(username) {
    return new CognitoUser({
      Username: username,
      Pool: this.getUserPool(),
    });
  }

  // Wrappers for cognito identity to transform them into promises
  login(username, password) {
    let self = this;
    return new Promise((resolve, reject) => {
      self
        .makeUser(username)
        .authenticateUser(self.makeAuthDetails(username, password), {
          onSuccess: result => resolve(result.getIdToken().getJwtToken()),
          onFailure: err => reject(err),
        });
    });
  }

  confirmRegistration(username, code) {
    return new Promise((resolve, reject) => {
      this.makeUser(username).confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  signUp(username, password, email) {
    let self = this;
    return new Promise((resolve, reject) => {
      pool = self.getUserPool();
      let attributeList = [];
      attributeList.push(self.makeAttribute('email', email));
      // async
      self
        .getUserPool()
        .signUp(username, password, attributeList, null, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
    });
  }
}
