import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { backbuttonicon } from '../../assets/vectors/Icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../../assets/Colors';

const PageHeader = (props) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, (props.bottomLine && styles.bottomLine)]}>
      <View style={styles.headerView}>
        {props.showBackBtn &&
          <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              position: 'absolute', zIndex: 1, top: RFPercentage(0.5), left: RFPercentage(1),
            },]}>
            <Image
              style={styles.iconStyle}
              source={require('../../assets/images/backarrow.png')}
            />
          </Pressable>
        }
        <Text style={styles.headerText}>{props.headerName}</Text>
      </View>
      {props.subHeaderText && <Text style={styles.subHeaderText}>{props.subHeaderText}</Text>}
    </View>
  )
}
export default PageHeader

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(7),
    width: '100%',
  },
  headerText: {
    color: Colors.black,
    fontWeight: '700',
    fontSize: RFPercentage(2.4),
    marginLeft: RFPercentage(8),
  },
  subHeaderText: {
    fontWeight: '400',
    fontSize: RFPercentage(2.2),
    color: Colors.grey2,
    marginLeft: RFPercentage(8),
    marginBottom: RFPercentage(1),
    marginTop: RFPercentage(-2)
  },
  bottomLine: {
    borderColor: Colors.lightGrey,
    borderBottomWidth: 2,
    borderBottomColor: Colors.grey5,
  },
  iconStyle: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
    marginTop: RFPercentage(1.3),
    marginLeft: RFPercentage(1.5)
  }
})