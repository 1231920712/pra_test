#
# Data columns include
# Location,Catalogue or inventory number,Provenance,Ht (= height),Plate reference,
# Vase description,Final note in entry

#Catalogue or inventory number and proven
from clean_data import clean_data
from pdfjiexi import extract_pdf
from find_ht import find_ht
from find_diam   import find_diam
from find_plate import find_plate
import re
class ht(object):
    def extract_location(self,x):
        p = re.compile(r'[0-9]{1,2}  [\w, .()-\/;]*')
        inventory = []
        for data_location in p.findall(x):
            inventory.append(data_location)
            # print(len(location))
            # print(location)
        return inventory
    def ht_clean_24RED(self,ht):
        # location = extract_location(x)
        length = len(ht)
        index = 0
        while index < length:
            if '  THE RED-FIGURED VASES OF PAESTUM ' in ht[index]:
                del ht[index]
                index-=1
                length -= 1
            index+=1
        return ht
    def ht_clean_PLATE(self,ht):
        # location = extract_location(x)
        length = len(ht)
        index = 0
        while index < length:
            if 'PLATE 2/' in ht[index]:
                del ht[index]
                index-=1
                length -= 1
            index+=1
        return ht
    def ht_clean_S(self,location):
        # location = extract_location(x)
        length = len(location)
        index = 0
        while index < length:
            if 'S. Agata 66' in location[index]:
                del location[index]
                index-=1
                length -= 1
            index+=1
        return location
    def extract_ht(self,index,data):
        new_data = []
        for i,a in enumerate(index):
            if a != -1:
                d = data[i][a:a+6]
                new_data.append(d)
            else:
                d = ' '
                new_data.append(d)
        return new_data
    def extract_diam(self,index,data):
        new_data = []
        for i,a in enumerate(index):
            if a != -1:
                d = data[i][a:a+10]
                new_data.append(d)
            else:
                d = ' '
                new_data.append(d)
        return new_data
    def extract_plate(self,index,data):
        new_data = []
        for i,a in enumerate(index):
            if a != -1:
                d = data[i][a:]
                new_data.append(d)
            else:
                d = ' '
                new_data.append(d)
        return new_data
    def pop_ht_data(self,ht):
        for i in [28,28,48,60]:
            ht.pop(i)
        return ht

if __name__ == '__main__':
    epdf = extract_pdf()
    x = epdf.get_pdf()
    ht = ht()
    data_ht = ht.extract_location(x)
    data_ht = ht.ht_clean_24RED(data_ht)
    data_ht = ht.ht_clean_PLATE(data_ht)
    data_ht = ht.ht_clean_S(data_ht)
    data = ht.pop_ht_data(data_ht)
    finder = find_ht()
    finder2 = find_diam()
    finder3 = find_plate()
    index  = finder.find_ht_index(data)
    data_ht = ht.extract_ht(index,data)
    index2 = finder2.find_diam_index(data)
    data_diam = ht.extract_diam(index2,data)
    index3 = finder3.find_plate_index(data)
    data_plate = ht.extract_plate(index3,data)

    print(index)
    print(data_ht)
    print(len(data_ht))
    print(len(data_diam))
    print(data_diam)
    print(len(data_plate))
    print(data_plate)



