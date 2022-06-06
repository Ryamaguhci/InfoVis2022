import requests
import pandas as pd
import codecs
REQUEST_URL = 'https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426'
APP_ID = '1055850997469422157'


def rakuten_api():
    df = pd.DataFrame()
    index_num = 0

    #ページ数(1~15ページ)
    for page in range(1,5):

        params = {
        "format":"json",
        "latitude":"126008.91",
        "longitude":"488734.83",
        "searchRadius":"0.5",
        "page": page,
        "applicationId":APP_ID
        }

        res = requests.get(REQUEST_URL, params)
        #レスポンスの中身を取得
        result = res.json()
        print(result)
        hotels = result["hotels"]

        for hotel in hotels:
            hotel_info = hotel["hotel"][0]["hotelBasicInfo"]
            if hotel_info['reviewCount'] is not None and hotel_info['reviewCount'] > 10 and hotel_info['reviewAverage'] != 0:
                _df = pd.DataFrame(hotel_info, index=[index_num])
                index_num+=1
                df = df.append(_df)

    return df

df = rakuten_api()

print(df.columns)

df[['hotelName','hotelInformationUrl','hotelMinCharge', 'latitude', 'longitude', 'reviewCount','reviewAverage']].to_csv("hotel_shijo.csv",index=False, encoding = "shift-jis")

