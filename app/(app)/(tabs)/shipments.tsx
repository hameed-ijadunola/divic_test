import {
  Button,
  Col,
  CustomText,
  CustomTextInput,
  Row,
  SafeAreaWrap,
  SpacedRow,
} from '@/components';
import { useSession } from '@/contexts/auth';
import { useCustomSelector } from '@/redux/features/customSelector';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import LogoSvg from '@/assets/svgs/shippex1.svg';
import BellSvg from '@/assets/svgs/bell.svg';
import SearchSvg from '@/assets/svgs/search-01.svg';
import SearchSvg1 from '@/assets/svgs/search-02.svg';
import FilterSvg from '@/assets/svgs/filter.svg';
import ScanSvg from '@/assets/svgs/scan.svg';
import CheckedSvg from '@/assets/svgs/checked.svg';
import UncheckedSvg from '@/assets/svgs/unchecked.svg';
import CheckedLightSvg from '@/assets/svgs/checkedlight.svg';
import InfoSvg from '@/assets/svgs/info.svg';
import InfoWhiteSvg from '@/assets/svgs/infowhite.svg';
import BoxSvg from '@/assets/svgs/box 1.svg';
import ArrowRightSvg from '@/assets/svgs/arrow-right.svg';
import ArrowSvg from '@/assets/svgs/arrowdark.svg';
import ArrowLightSvg from '@/assets/svgs/arrowlight.svg';
import WhatsAppSvg from '@/assets/svgs/Whatsapp.svg';
import CallSvg from '@/assets/svgs/phone.svg';
import GrabberSvg from '@/assets/svgs/Grabber.svg';
import fonts from '@/constants/fonts';
import { Colors } from '@/constants/colors';
import { isSubstringInArray, removeDuplicatesByKey } from '@/helpers/functions';
import {
  useGetShipmentStatusMutation,
  useGetShipmentsMutation,
} from '@/redux/features/user/userApi';
import { customFetchQuery } from '@/redux/features/customFetchQuery';
import { saveToStore } from '@/redux/features/user/userSlice';
import ReactNativeModal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

const Shipment = () => {
  const { navigate } = useRouter();
  const { endSession } = useSession();
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const { user } = useCustomSelector('userAuth');
  const { shipments, shipmentStatus } = useCustomSelector();
  const [searchText, setSearchText] = useState('');
  const [searchTextFocused, setSearchTextFocused] = useState(false);
  const [markAll, setMarkAll] = useState(false);
  const [markedItems, setMarkedItems] = useState([]);
  const [openedItems, setOpenedItems] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState<any[]>([]);
  const [filterTempOptions, setFilterTempOptions] = useState<any[]>([]);
  const statusOptions = [
    { label: 'error', value: 'error', color: '#D12030', bg: '#FEE3D4' },
    { label: 'received', value: 'received', color: '#2F50C1', bg: '#D9E6FD' },
    { label: 'delivered', value: 'delivered', color: '#208D28', bg: '#E3FAD6' },
    { label: 'putaway', value: 'putaway', color: '#58536E', bg: '#F4F2F8' },
    { label: 'canceled', value: 'canceled', color: '#58536E', bg: '#F4F2F8' },
    { label: 'rejected', value: 'rejected', color: '#D12030', bg: '#FEE3D4' },
    { label: 'lost', value: 'lost', color: '#D12030', bg: '#FEE3D4' },
    { label: 'on hold', value: 'on hold', color: '#DB7E21', bg: '#FFF3D5' },
    {
      _assign: null,
      _comments: null,
      _liked_by: null,
      _user_tags: null,
      color: '#761ACB',
      creation: '2023-02-21 11:53:33.952548',
      docstatus: 0,
      idx: 1,
      modified: '2024-03-21 11:43:05.485522',
      modified_by: 'Administrator',
      name: 'New ShipmentTT',
      owner: 'ahmed.fathy@brandimic.com',
      status: 'New ShipmentTT',
      bg: '#D9E6FD',
    },
    {
      _assign: null,
      _comments: null,
      _liked_by: null,
      _user_tags: null,
      color: '#CB2929',
      creation: '2024-02-05 12:50:28.231753',
      docstatus: 0,
      idx: 0,
      modified: '2024-02-05 12:50:28.231753',
      modified_by: 'Administrator',
      name: 'PUP',
      owner: 'Administrator',
      status: 'PUP',
      bg: '#FEE3D4',
    },
    {
      _assign: null,
      _comments: null,
      _liked_by: null,
      _user_tags: null,
      color: '#CB2929',
      creation: '2024-01-22 10:03:29.564104',
      docstatus: 0,
      idx: 0,
      modified: '2024-01-22 10:03:29.564104',
      modified_by: 'Administrator',
      name: 'test status',
      owner: 'Administrator',
      status: 'test status',
      bg: '#FEE3D4',
    },
  ];

  const extractStatus = (status: string) => {
    const isStatus = shipmentStatus?.find(
      (x: { name: string }) => x.name == status,
    );
    return isStatus
      ? {
          label: isStatus?.name,
          value: isStatus?.status,
          color: isStatus?.color,
          bg: isStatus?.color === '#CB2929' ? '#FEE3D4' : '#F4F2F8',
        }
      : statusOptions?.find(x => x.label == status) || {
          label: status,
          value: status,
          color: '#58536E',
          bg: '#F4F2F8',
        };
  };

  const [getShipments, { isLoading: loadingShipments }] =
    useGetShipmentsMutation();
  const [getShipmentStatus, { isLoading: loadingShipmentStatus }] =
    useGetShipmentStatusMutation();

  const fetchShipmentStatus = async () => {
    await customFetchQuery({
      api: getShipmentStatus,
      apiProps: {
        doctype: 'AWB Status',
        fields: ['*'],
        filters: {
          // name: ['like', '210173066690'],
          // sender: ['like', 'EG1156'],
        },
      },
      handleSuccess: data => {
        console.log('data?.message', data?.message);
        dispatch(saveToStore(['shipmentStatus', data?.message]));
      },
      handleError(error) {
        console.log('error', error);
      },
    });
  };

  const fetchShipments = async () => {
    await customFetchQuery({
      api: getShipments,
      apiProps: {
        doctype: 'AWB',
        fields: ['*'],
        filters: {
          // name: ['like', '210173066690'],
          // sender: ['like', 'EG1156'],
        },
      },
      handleSuccess: data => {
        dispatch(saveToStore(['shipments', data?.message]));
      },
      handleError(error) {
        console.log('error', error);
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      !loadingShipments && fetchShipments();
      !loadingShipmentStatus && fetchShipmentStatus();
    }, []),
  );

  const filteredData: any[] = useMemo(() => {
    let filtered = shipments || [];
    console.log(
      'shipments',
      filtered[0]?.sender_phone,
      filtered[0]?.consignee_phone,
    );
    if (searchText) {
      filtered = filtered.filter((x: any) =>
        isSubstringInArray(searchText, [
          x.name,
          x.status,
          x.owner,
          x.sender,
          x.sender_phone,
          x.sender_name,
          x.origin_address_line_1,
          x.origin_address_line_2,
          x.origin_area,
          x.origin_city,
          x.origin_state,
          x.origin_zone,
          x.origin_country,
          x.destination_address_line_1,
          x.destination_address_line_2,
          x.destination_area,
          x.destination_city,
          x.destination_state,
          x.destination_zone,
          x.destination_country,
        ]),
      );
    }
    if (filterOptions?.length > 0) {
      filtered = filtered.filter((x: any) =>
        isSubstringInArray(x?.status, filterOptions),
      );
    }
    return filtered;
  }, [shipments, searchText, filterOptions]);

  const testPhoneNumber = '1234567890';
  const testMessage = 'Hello, how are you?';

  const makeCall = (phoneNumber: any) => {
    let phoneUrl = `tel:${phoneNumber || testPhoneNumber}`;

    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch(err => console.error('Error opening URL', err));
  };

  const openWhatsApp = (phoneNumber: any, message: string) => {
    let whatsappUrl = `https://api.whatsapp.com/send?phone=${
      phoneNumber || testPhoneNumber
    }&text=${encodeURIComponent(message || testMessage)}`;

    Linking.canOpenURL(whatsappUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('WhatsApp is not installed');
        } else {
          return Linking.openURL(whatsappUrl);
        }
      })
      .catch(err => console.error('Error opening URL', err));
  };

  return (
    <>
      <SafeAreaWrap style={{ paddingHorizontal: 16 }}>
        <Row padding="12px 0px">
          <Image
            source={require('@/assets/images/Frame 49.png')}
            style={styles.image}
          />
          <LogoSvg />
          <BellSvg style={styles.image} />
        </Row>
        <Col marginBottom={24} marginTop={12}>
          <CustomText
            text="Hello,"
            styleArray={[14, fonts.variable, Colors.baseBlack]}
            style={{ fontWeight: 'normal' }}
          />
          <CustomText
            text={user?.full_name}
            styleArray={[28, fonts.semiBold, Colors.baseBlack]}
          />
        </Col>
        <CustomTextInput
          label=""
          staticLabel
          placeholder="Search"
          handleChange={text => setSearchText(text)}
          onFocus={() => setSearchTextFocused(true)}
          onBlur={() => setSearchTextFocused(false)}
          value={searchText}
          height={44}
          leftComponent={
            searchTextFocused ? (
              <SearchSvg1 style={{ marginRight: 8 }} />
            ) : (
              <SearchSvg style={{ marginRight: 8 }} />
            )
          }
          rightComponent={
            searchText && (
              <Ionicons
                name="close"
                size={26}
                color={Colors.primaryLight}
                style={{ paddingRight: 4 }}
                onPress={() => setSearchText('')}
              />
            )
          }
        />
        <Row padding="24px 0px">
          <Button
            variant="other"
            bgColor="#F4F2F8"
            height={44}
            width={width / 2 - 24}
            onPress={() => {
              setShowFilter(true);
            }}>
            <FilterSvg
              onPress={() => {
                setShowFilter(true);
              }}
            />
            <CustomText
              text="Filter"
              styleArray={[16, fonts.variable, Colors.inputtext]}
              fontWeight="normal"
              left={8}
              onPress={() => {
                setShowFilter(true);
              }}
            />
          </Button>
          <Button height={44} width={width / 2 - 24}>
            <ScanSvg />
            <CustomText
              text="Add Scan"
              styleArray={[16, fonts.variable, Colors.white]}
              fontWeight="normal"
              left={8}
            />
          </Button>
        </Row>
        <Row padding="0px 0px 24px 0px">
          <CustomText
            text="Shipments"
            styleArray={[22, fonts.SFSemiBold, Colors.baseBlack]}
          />
          <SpacedRow justify="flex-start">
            {markAll ? (
              <CheckedSvg
                onPress={() => {
                  setMarkAll(false);
                  setMarkedItems([]);
                }}
              />
            ) : (
              <UncheckedSvg
                onPress={() => {
                  setMarkAll(true);
                  setMarkedItems(shipments);
                }}
              />
            )}
            <CustomText
              text="Mark All"
              styleArray={[18, fonts.SFRegular, Colors.primary]}
              left={8}
              onPress={() => {
                setMarkAll(!markAll);
                setMarkedItems(markAll?.length > 0 ? [] : shipments);
              }}
            />
          </SpacedRow>
        </Row>

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loadingShipments}
              onRefresh={async () => {
                await fetchShipments();
              }}
            />
          }
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          data={filteredData}
          keyExtractor={item => item?.name}
          renderItem={({ item, index }) => {
            const {
              name,
              status,
              owner,
              sender,
              sender_phone,
              consignee_phone,
              sender_name,
              origin_address_line_1,
              origin_address_line_2,
              origin_area,
              origin_city,
              origin_zone,
              origin_state,
              origin_country,
              destination_address_line_1,
              destination_address_line_2,
              destination_area,
              destination_city,
              destination_zone,
              destination_state,
              destination_country,
            } = item;
            const isOpened = openedItems?.find((x: any) => x?.name == name);
            const isMarked = markedItems?.find((x: any) => x?.name == name);
            return (
              <Col
                borderRadius={10}
                bgColor="rgba(244, 242, 248, 0.5)"
                borderColor={
                  isMarked ? Colors.primaryLight : Colors.transparent
                }
                style={{
                  borderWidth: 2,
                  borderBottomWidth: 2,
                  borderTopWidth: 2,
                  marginBottom: 8,
                }}>
                <Row
                  padding="12px"
                  style={[
                    {
                      borderRadius: 10,
                      flexWrap: 'nowrap',
                    },
                    isOpened && {
                      borderBottomWidth: 2,
                      borderStyle: 'dotted',
                      borderColor: Colors.white,
                      borderRadius: 0,
                      borderTopStartRadius: 10,
                      borderTopEndRadius: 10,
                    },
                  ]}
                  bgColor="#F4F2F8">
                  {isMarked && isOpened ? (
                    <CheckedSvg
                      onPress={() =>
                        setMarkedItems(
                          markedItems?.filter(x => x?.name !== name),
                        )
                      }
                    />
                  ) : isMarked ? (
                    <CheckedLightSvg
                      onPress={() =>
                        setMarkedItems(
                          markedItems?.filter(x => x?.name !== name),
                        )
                      }
                    />
                  ) : (
                    <UncheckedSvg
                      onPress={() => setMarkedItems([...markedItems, item])}
                    />
                  )}
                  <BoxSvg style={{ paddingLeft: 4 }} />
                  <Col width={'auto'} paddingLeft={4}>
                    <CustomText
                      text="AWB"
                      styleArray={[13, fonts.variable, '#3F395C']}
                      style={{
                        textTransform: 'uppercase',
                        fontWeight: 'regular',
                      }}
                    />
                    <CustomText
                      text={name}
                      styleArray={[18, fonts.variable, Colors.black]}
                      style={{ fontWeight: '700' }}
                    />
                    <Row width={'auto'}>
                      <CustomText
                        text={origin_state || origin_city}
                        styleArray={[13, fonts.variable, '#757281']}
                        style={{
                          textTransform: 'capitalize',
                          fontWeight: 'regular',
                        }}
                        right={8}
                      />
                      {isMarked && isOpened ? (
                        <ArrowSvg onPress={() => setMarkAll(false)} />
                      ) : isMarked ? (
                        <ArrowLightSvg onPress={() => setMarkAll(true)} />
                      ) : (
                        <ArrowSvg onPress={() => setMarkAll(true)} />
                      )}
                      <CustomText
                        text={destination_state || destination_city}
                        styleArray={[13, fonts.variable, '#757281']}
                        style={{
                          textTransform: 'capitalize',
                          fontWeight: 'regular',
                        }}
                        left={8}
                      />
                    </Row>
                  </Col>
                  <CustomText
                    text={
                      extractStatus(status)?.label ||
                      extractStatus(status)?.name
                    }
                    styleArray={[
                      11,
                      fonts.variable,
                      extractStatus(status)?.color,
                    ]}
                    wrapperStyle={{
                      borderRadius: 4,
                      backgroundColor: extractStatus(status)?.bg || '#f4f2f8',
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      flexWrap: 'wrap',
                      borderColor: Colors.white,
                      borderWidth: 1,
                    }}
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: 'regular',
                      width: 80,
                    }}
                    numberOfLines={1}
                  />
                  {isOpened ? (
                    <InfoSvg
                      onPress={() =>
                        setOpenedItems(
                          openedItems?.filter(x => x?.name !== name),
                        )
                      }
                    />
                  ) : (
                    <InfoWhiteSvg
                      onPress={() => setOpenedItems([...openedItems, item])}
                    />
                  )}
                </Row>
                {isOpened && (
                  <Col padding="10px 12px 10px 12px">
                    <Row>
                      <Col width={width / 2 - 50}>
                        <CustomText
                          text="Origin"
                          styleArray={[11, fonts.variable, Colors.primary]}
                          style={{
                            textTransform: 'capitalize',
                            fontWeight: 'regular',
                          }}
                        />
                        <CustomText
                          top={4}
                          text={origin_state || origin_city}
                          styleArray={[16, fonts.variable, Colors.black]}
                          style={{
                            textTransform: 'capitalize',
                            fontWeight: 'regular',
                          }}
                        />
                        <CustomText
                          top={4}
                          text={
                            (origin_city || origin_area || origin_zone) +
                            (origin_address_line_1 || '')
                          }
                          styleArray={[13, fonts.variable, Colors.primarytext]}
                          style={{
                            textTransform: 'capitalize',
                            fontWeight: 'light',
                          }}
                        />
                      </Col>

                      <ArrowRightSvg />

                      <Col width={width / 2 - 50} align="flex-end">
                        <Col width={'auto'}>
                          <CustomText
                            text="Destination"
                            styleArray={[11, fonts.variable, Colors.primary]}
                            style={{
                              textTransform: 'capitalize',
                              fontWeight: 'regular',
                            }}
                          />
                          <CustomText
                            top={4}
                            text={destination_state || destination_city}
                            styleArray={[16, fonts.variable, Colors.black]}
                            style={{
                              textTransform: 'capitalize',
                              fontWeight: 'regular',
                            }}
                          />
                          <CustomText
                            top={4}
                            text={
                              (destination_city ||
                                destination_area ||
                                destination_zone) +
                              (destination_address_line_1 || '')
                            }
                            styleArray={[
                              13,
                              fonts.variable,
                              Colors.primarytext,
                            ]}
                            style={{
                              textTransform: 'capitalize',
                              fontWeight: 'light',
                            }}
                          />
                        </Col>
                      </Col>
                    </Row>
                    <Row justify="flex-end" marginTop={24}>
                      <Button
                        bgColor={'#6E91EC'}
                        variant="other"
                        height={40}
                        width={'auto'}
                        style={{ paddingLeft: 17.5, paddingRight: 21.5 }}
                        onPress={() => {
                          makeCall(consignee_phone || sender_phone);
                        }}>
                        <CallSvg
                          onPress={() => {
                            makeCall(consignee_phone || sender_phone);
                          }}
                        />
                        <CustomText
                          text="Call"
                          styleArray={[16, fonts.variable, Colors.white]}
                          fontWeight="regular"
                          left={8}
                          onPress={() => {
                            makeCall(consignee_phone || sender_phone);
                          }}
                        />
                      </Button>
                      <Button
                        bgColor={'#25D366'}
                        variant="other"
                        height={40}
                        width={'auto'}
                        style={{
                          paddingLeft: 14,
                          paddingRight: 18,
                          marginLeft: 14,
                        }}
                        onPress={() => {
                          openWhatsApp(consignee_phone || sender_phone, '');
                        }}>
                        <WhatsAppSvg
                          onPress={() => {
                            openWhatsApp(consignee_phone || sender_phone, '');
                          }}
                        />
                        <CustomText
                          text="WhatsApp"
                          styleArray={[16, fonts.variable, Colors.white]}
                          fontWeight="regular"
                          left={8}
                          onPress={() => {
                            openWhatsApp(consignee_phone || sender_phone, '');
                          }}
                        />
                      </Button>
                    </Row>
                  </Col>
                )}
              </Col>
            );
          }}
          ListEmptyComponent={
            <Col align="center" justify="center" style={{ flex: 1 }}>
              <CustomText
                text={
                  loadingShipments
                    ? 'Loading...'
                    : searchText
                    ? `Shipments not found`
                    : 'No Shipment found'
                }
                styleArray={[16, fonts.bold, Colors.neutral_60]}
                style={{ marginBottom: 8, marginTop: 40, textAlign: 'center' }}
              />
              {!loadingShipments && (
                <CustomText
                  text={
                    `No results found. ` +
                    (searchText
                      ? `Try searching with a different keyword.`
                      : '')
                  }
                  styleArray={[14, fonts.bold, Colors.neutral_50]}
                  style={{ textAlign: 'center' }}
                  wrapperStyle={{ maxWidth: 250 }}
                />
              )}
            </Col>
          }
        />
      </SafeAreaWrap>
      <ReactNativeModal
        avoidKeyboard={false}
        testID={'modal'}
        isVisible={showFilter}
        coverScreen
        backdropOpacity={0.5}
        onBackdropPress={() => setShowFilter(false)}
        style={{
          justifyContent: 'flex-end',
          height: height,
          margin: 0,
        }}>
        <Col
          padding="5px 0px 32px 0px"
          bgColor={Colors.baseWhite}
          style={{
            bottom: 0,
            width: '100%',
            // height: height / 2,
            borderTopEndRadius: 12,
            borderTopStartRadius: 12,
          }}>
          <Col align="center" justify="center" width={width} paddingTop={5}>
            <GrabberSvg />
          </Col>
          <Row padding="14px 24px 12px 24px">
            <CustomText
              text="Cancel"
              styleArray={[16, fonts.variable, Colors.primary]}
              style={{
                fontWeight: 'medium',
                width: width / 3 - 24,
                alignItems: 'center',
                textAlign: 'left',
              }}
              onPress={() => {
                setFilterOptions([]);
                setShowFilter(false);
              }}
            />
            <CustomText
              text={'Filters'}
              styleArray={[18, fonts.variable, Colors.baseBlack]}
              style={{
                fontWeight: 'semibold',
                width: width / 3 - 24,
                alignItems: 'center',
                textAlign: 'center',
              }}
            />
            <CustomText
              text={'Done'}
              styleArray={[16, fonts.variable, Colors.primary]}
              style={{
                fontWeight: 'medium',
                width: width / 3 - 24,
                alignItems: 'center',
                textAlign: 'right',
              }}
              onPress={() => {
                setFilterOptions(filterTempOptions);
                setShowFilter(false);
              }}
            />
          </Row>
          <Row width={width} bgColor={'#EAE7F2'} style={{ height: 1 }}></Row>
          <Col padding="12px 24px 12px 24px">
            <CustomText
              text="SHIPMENT STATUS"
              styleArray={[13, fonts.variable, Colors.inputtext]}
              style={{ fontWeight: 'medium', lineHeight: 26 }}
              bottom={12}
            />
            <Row gap={10} justify="flex-start">
              {shipmentStatus?.map((x: { name: any; label: any }) => (
                <CustomText
                  text={x?.name || x?.label}
                  styleArray={[
                    16,
                    fonts.variable,
                    filterTempOptions?.find(opt => opt === x?.name || x?.label)
                      ? Colors.primary
                      : Colors.inputtext,
                  ]}
                  style={{ fontWeight: 'regular' }}
                  wrapperStyle={{
                    paddingRight: 14,
                    paddingLeft: 14,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 10,
                    backgroundColor: Colors.inputBg,
                    borderWidth: 2,
                    borderColor: filterTempOptions?.find(
                      opt => opt === x?.name || x?.label,
                    )
                      ? Colors.primaryLight
                      : Colors.transparent,
                  }}
                  onPress={() =>
                    setFilterTempOptions(
                      filterTempOptions?.find(
                        opt => opt === x?.name || x?.label,
                      )
                        ? filterTempOptions?.filter(
                            opt => opt !== x?.name || x?.label,
                          )
                        : [...filterTempOptions, x?.name || x?.label],
                    )
                  }
                />
              ))}
            </Row>
          </Col>
        </Col>
      </ReactNativeModal>
    </>
  );
};

export default Shipment;

const styles = StyleSheet.create({ image: { width: 40, height: 40 } });
