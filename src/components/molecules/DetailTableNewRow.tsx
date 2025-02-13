import { Dispatch, memo, SetStateAction } from 'react';
import { SaveIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/outline';
import { IUseDetailData } from '@hooks/useDetailData';
import { IUseDate } from '@hooks/useDate';
import { IconButton } from '@atoms/IconButton';
import { Select } from '@atoms/Select';
import { Input } from '@atoms/Input';
import { useLogs } from '@hooks/useLogs';
import { selectedPeriodStates } from '@recoil/selectedPeriodState';
import { categories } from '@hooks/useDetailData';

type Props = {
  setIsAddRowMode: Dispatch<SetStateAction<boolean>>;
  category: IUseDetailData['category'];
  place: IUseDetailData['place'];
  money: IUseDetailData['money'];
  handleChangeCategory: IUseDetailData['handleChangeCategory'];
  handleChangePlace: IUseDetailData['handleChangePlace'];
  handleChangeMoney: IUseDetailData['handleChangeMoney'];
  setLog: IUseDetailData['setLog'];
  clearValues: IUseDetailData['clearValues'];
  selectDate: IUseDate['selectDate'];
};

const DetailTableNewRowBase = ({
  setIsAddRowMode,
  category,
  place,
  money,
  handleChangeCategory,
  handleChangePlace,
  handleChangeMoney,
  setLog,
  clearValues,
  selectDate,
}: Props) => {
  const { getLogs } = useLogs();
  const [selectedPeriod] = selectedPeriodStates.useSelectedPeriodState();

  const handleSaveClick = async () => {
    await setLog(selectDate.format('YYYY-MM-DD'));
    await getLogs({
      start: selectedPeriod.startDate,
      end: selectedPeriod.endDate,
    });
    setIsAddRowMode(false);
  };

  const handleCancel = () => {
    setIsAddRowMode(false);
    clearValues();
  };

  return (
    <tr className="text-sm">
      <td width="25%" className="py-2 px-1">
        <Select
          value={category}
          onChange={handleChangeCategory}
          options={categories}
        />
      </td>
      {/* <td width="40%" className="py-2 px-1">
        <Input value={place} onChange={handleChangePlace} />
      </td> */}
      <td width="25%" className="py-2 px-1">
        <Input value={money} onChange={handleChangeMoney} />
      </td>
      <td className="py-2 pr-2">
        <div className="flex justify-end">
          <IconButton
            handleClick={handleSaveClick}
            addClass="text-gray-700"
            tipText="保存"
          >
            <SaveIcon className="w-6 h-6" />
          </IconButton>
          <IconButton
            handleClick={handleCancel}
            addClass="text-gray-700"
            tipText="キャンセル"
          >
            <XCircleIcon className="w-6 h-6" />
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export const DetailTableNewRow = memo(DetailTableNewRowBase);
