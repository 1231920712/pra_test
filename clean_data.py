import string
class clean_data(object):
    def r_strip(self,data):
        data_cleaned = []
        for i in data:
            i = i.rstrip()
            data_cleaned.append(i)
        return data_cleaned
    def r_strip_uppercase(self,data):
        data_cleaned = []
        for i in data:
            i = i.rstrip(string.ascii_uppercase)
            data_cleaned.append(i)
        return data_cleaned
    def r_strip_com(self,data):
        data_cleaned = []
        for i in data:
            i = i.rstrip(',')
            data_cleaned.append(i)
        return data_cleaned

