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
class inventory(object):
    def extract_location(self,x):
        p = re.compile(r'[0-9]{1,2}  [A-Z a-z]*[ ,]([\w .()=]*)')
        inventory = []
        for data_location in p.findall(x):
            inventory.append(data_location)
            # print(len(location))
            # print(location)
        return inventory
    def inventory_clean_2(self,location):
        # location = extract_location(x)
        length = len(location)
        index = 0
        while index < length:
            if location[index] == '2':
                del location[index]
                index-=1
                length -= 1
            index+=1
        return location
    def inv_clean_S(self,location):
        # location = extract_location(x)
        length = len(location)
        index = 0
        while index < length:
            if location[index] == 'S. Agata 66':
                del location[index]
                index-=1
                length -= 1
            index+=1
        return location
    def inv_clean_RED(self,location):
        # location = extract_location(x)
        length = len(location)
        index = 0
        while index < length:
            if location[index] == 'RED':
                del location[index]
                index-=1
                length -= 1
            index+=1
        return location
    def clean_ht(self,index,data):
        new_data = []
        for i,a in enumerate(index):
            if a != -1:
                d = data[i][:a]
                new_data.append(d)
            else:
                d = data[i]
                new_data.append(d)
        return new_data
if __name__ == '__main__':
    epdf = extract_pdf()
    x = epdf.get_pdf()
    inv = inventory()
    data_inv = inv.extract_location(x)
    data_inv = inv.inventory_clean_2(data_inv)
    data_inv = inv.inv_clean_RED(data_inv)
    data_inv = inv.inv_clean_S(data_inv)
    print(data_inv)
    finder = find_ht()
    finder2 = find_diam()
    finder3 = find_plate()
    index = finder.find_ht_index(data_inv)
    data_inv = inv.clean_ht(index,data_inv)
    index2 = finder.find_ht_index2(data_inv)
    data_inv = inv.clean_ht(index2, data_inv)
    index3 = finder2.find_diam_index(data_inv)
    data_inv = inv.clean_ht(index3, data_inv)
    index4 = finder3.find_plate_index(data_inv)
    data_inv = inv.clean_ht(index4, data_inv)
    print(data_inv)
    print(len(data_inv))



