from pdfjiexi import extract_pdf
from dataformat_location import location
class description(object):
    def get_des(self,x):
        loc = location()
        data_loc = loc.extract_location(x)
        data_loc = loc.location_clean_and(data_loc)
        data_loc = loc.location_clean_the(data_loc)
        data_loc = loc.location_clean_plate(data_loc)
        des_index_list = []
        x = x.split('\n')
        for data in x:
            for i in data_loc:
                if i in data:
                    des_index = x.index(data)
                    des_index_list.append(des_index)

        des_index_list = set(des_index_list)
        des_index_list_new = []
        for i in des_index_list:
            des_index_list_new.append(i)
        des_index_list_new.sort()
        des_full = []
        for i in range(len(des_index_list_new) - 1):
            descriiption = []
            for j in range(des_index_list_new[i] + 1, des_index_list_new[i + 1]):
                descriiption.append(x[j])
            des_str = ''.join(descriiption)
            # print(des_str)
            # print('---')
            des_full.append(des_str)

        # print(des_index_list_new)
        # print(len(des_index_list_new))
        return des_full
if __name__ == '__main__':

    epdf = extract_pdf()
    x = epdf.get_pdf()
    print(x)
    des = description()
    list = des.get_des(x)
    print(list)

