# -------------------------------------投手のデータを一括で取得します------------------------
import numpy
import pandas as pd
#import ssl
#ssl._create_default_https_context = ssl._create_unverified_context
#import matplotlib.pylab as plt

#urlをリスト形式で取得
df_all = []
#各要素に各年のデータが入る(執筆時点では2020年が最新)
# 2022年から2008年まで
years = range(22,8,-1)
urls = []
#URLを入力：最新年度だけ命名規則が違う
for year in years:
    if(year==20):
        urls.append('####サイトのULRを入力してください。######')
    else:
        # http://baseball-data.com/'+ "{0:02d}".format(year)+'/stats/pitcher-all/era-1.html
        urls.append('#####')
year=20
#--------------------------データをURLから取得-------------------------------------------
for url in urls:
    print('取得URL：'+url)
    df = pd.io.html.read_html(url)
    df = df[0]
    df_all.append(df)
    year=year - 1
    file_path="new_" + str(year)+"_npb_pichar.csv"
    df.to_csv(file_path,encoding="cp932",index=None)

df_all = []
year = 21
### 年度の列を追加 ###
for year in years:
    file_path= "new_" + str(year)+"_npb_pichar.csv"
    df=pd.read_csv(file_path,encoding = "utf-8")
    df = df.drop([0])
    # year には 20 から 8までのデータが入っているので、一けたになるのを防止する
    y = str(year)
    if len(y) == 1:
        y = "0" + y # "8" → "08" にする
    df["year"] = str(20) + y
    df_all.append(df)
    print('読み込んだファイル：'+file_path)
    df.to_csv(file_path,encoding = "utf-8",index=None)

df_result = pd.DataFrame(df_result)
del df_result["順位"]
df_result = df_result.sort_values(["チーム","選手名","year"])
print(df_result)

