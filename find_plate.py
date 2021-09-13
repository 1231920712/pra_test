class find_plate(object):
    def find_plate_index(self,data):
        indexs_plate =[]
        for i in data:
            index = i.find('PLATE')
            indexs_plate.append(index)
        return indexs_plate