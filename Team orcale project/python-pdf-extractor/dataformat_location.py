#
# Data columns include
# Location,Catalogue or inventory number,Provenance,Ht (= height),Plate reference,
# Vase description,Final note in entry

#Location
from clean_data import clean_data
from pdfextractor import extract_pdf
import re
class location(object):
    def extract_location(self,x):
        p = re.compile(r'[0-9]{1,2}  ([A-Z a-z]*[ ,])')
        location = []
        for data_location in p.findall(x):
            location.append(data_location)
            # print(len(location))
            # print(location)
        return location
    def location_clean_the(self,location):
        # location = extract_location(x)
        length = len(location)
        index = 0
        while index < length:
            if location[index] == 'THE ':
                del location[index]
                index-=1
                length -= 1
            index+=1
        return location
    def location_clean_plate(self,location):
        # location = extract_location(x)
        length = len(location)
        index = 0
        while index < length:
            if location[index] == 'PLATE ':
                del location[index]
                index-=1
                length -= 1
            index+=1
        return location
    def location_clean_and(self,location):
        # location = extract_location(x)
        length = len(location)
        index = 0
        while index < length:
            if location[index] == 'and ':
                del location[index]
                index-=1
                length -= 1
            index+=1
        return location
if __name__ == '__main__':
    epdf = extract_pdf()
    x = epdf.get_pdf()
    loc = location()
    data_loc = loc.extract_location(x)
    data_loc = loc.location_clean_and(data_loc)
    data_loc =  loc.location_clean_the(data_loc)
    data_loc = loc.location_clean_plate(data_loc)
    data_cleaner = clean_data()
    data_loc = clean_data.r_strip(data_cleaner,data=data_loc)
    data_loc = clean_data.r_strip_uppercase(data_cleaner,data_loc)
    data_loc = clean_data.r_strip_com(data_cleaner,data_loc)
    data_loc = clean_data.r_strip(data_cleaner, data=data_loc)
    print(data_loc)
    print(len(data_loc))


