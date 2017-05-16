import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import { Form, Item, Label, Input } from 'native-base';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        >
        <Text>PERSONAL INFORMATION</Text>
        <Form>
          <Item floatingLabel>
            <Label>Full Name</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Phone</Label>
            <Input />
          </Item>
        </Form>
        <Text>COMPANY INFORMATION</Text>
        <Form>
          <Item floatingLabel>
            <Label>Company Name</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Address Line #1</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Address Line #2</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Company nature</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Company Registration office</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Company Reg. #</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Company Code</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>VAT # (if applicable)</Label>
            <Input />
          </Item>
        </Form>
        <Text>BANK INFORMATION</Text>
        <Form>
          <Item floatingLabel>
            <Label>Bank</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>IBAN</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>BIC</Label>
            <Input />
          </Item>
        </Form>
        <Text>SIGNATURE STAMP</Text>


        <Button
          onPress={() => this.props.navigation.navigate('SignatureStamp')}
          title="Go to Signature stamp details"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
