class find_diam(object):
    def find_diam_index(self,data):
        indexs_diam =[]
        for i in data:
            index = i.find('Diam')
            indexs_diam.append(index)
        return indexs_diam