import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils';
import {
  CreateDonationMutation,
  CreateDonationMutationVariables,
} from 'gql/graphql';
import { BsPiggyBank } from 'react-icons/bs';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import 'moment/locale/fr';
import moment from 'moment';

const CREATE_DONATION = gql`
  mutation createDonation($amount: Float!) {
    createDonation(amount: $amount) {
      amount
      date
    }
  }
`;

const Donation = () => {
  const [total, setTotal] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<string>('5');
  const [contributions, setContributions] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleButtonClick = (amountToAdd: number) => {
    setSelectedAmount(amountToAdd.toString());
  };

  const handleConfirmClick = async () => {
    const amountToAdd = parseInt(selectedAmount);
    if (!isNaN(amountToAdd)) {
      setTotal(total + amountToAdd);
      setSelectedAmount('');
      setContributions([...contributions, amountToAdd.toString()]);
      try {
        await createDonation({
          variables: {
            amount: amountToAdd,
          },
        });
        toast.success(
          `Merci d'avoir soutenu le projet. Votre donation de ${amountToAdd}€ a été bien été validée.`
        );
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  const lastContributors = contributions
    .slice(-4)
    .map((contribution, index) => (
      <div key={index} className="flex items-center text-black">
        <BsPiggyBank className="mr-2" />
        <p>{contribution}€</p>
      </div>
    ));

  const openModal = () => {
    setShowModal(true);
  };

  const [createDonation, { data }] = useMutation<
    CreateDonationMutation,
    CreateDonationMutationVariables
  >(CREATE_DONATION);
  console.log('data', data);

  let responseDate = moment(data?.createDonation.date).format('DD/MM/YYYY');

  return (
    <div className="h-[110vh] overflow-y-scroll">
      <div className="flex items-center flex-col text-[#609f39] mt-4">
        <h1 className="font-bold text-[25px]">Donation</h1>
        <p className="italic">Soutenez Wild Carbon !</p>
      </div>
      <div className="flex items-center flex-col text-[#484B8A] font-bold mt-6 text-[20px]">
        <h3>Total de la cagnotte en cours : </h3>
        <p>{total}€</p>
      </div>
      <div className="border mx-[40px] my-[37px]"></div>
      <div className="flex items-center flex-col text-[#609f39] font-bold">
        <h2 className="text-[20px]">Je participe à hauteur de :</h2>
        <div className="flex justify-center text-[35px]">
          <input
            type="text"
            value={selectedAmount}
            placeholder="5"
            onChange={(e) => setSelectedAmount(e.target.value)}
            className="border-none bg-transparent w-[70px] text-center"
          />
          <span>€</span>
        </div>
      </div>
      <div className="flex justify-around mt-6 font-bold">
        <button
          type="submit"
          onClick={() => handleButtonClick(10)}
          className="rounded-lg bg-[#ffffff] shadow-lg py-5 px-5"
        >
          10€
        </button>
        <button
          type="submit"
          onClick={() => handleButtonClick(15)}
          className="rounded-lg bg-[#ffffff] shadow-lg py-5 px-5"
        >
          15€
        </button>
        <button
          type="submit"
          onClick={() => handleButtonClick(20)}
          className="rounded-lg bg-[#ffffff] shadow-lg py-5 px-5"
        >
          20€
        </button>
      </div>
      <div className="flex justify-center text-[#ffffff] my-7 font-bold">
        <button
          type="submit"
          onClick={handleConfirmClick}
          className="bg-[#484B8A] py-[10px] px-[90px] rounded-lg"
        >
          Confirmer
        </button>
      </div>
      <div>
        <h4 className="ml-5 text-[#609f39] font-semibold mb-[5px]">
          Derniers contributeurs :
        </h4>
        <p className="ml-5 flex flex-col flex-wrap">{lastContributors}</p>
        <button
          type="button"
          onClick={openModal}
          className="ml-5 text-[#609f39] font-semibold mt-[8px]"
        >
          Historique de vos donations :
        </button>
      </div>
      {showModal && (
        <div>
          <span onClick={() => setShowModal(false)}>
            <div className=" ml-5 mt-[5px] mb-[10px]">
              <BsFillArrowUpCircleFill
                style={{
                  fontSize: '22px',
                  color: '#609f39',
                }}
              />
            </div>
          </span>
          <div className="ml-5 text-[#609f39] font-semibold flex flex-col">
            {contributions.map((contribution, index) => (
              <p key={index}>
                Donation de {contribution}€ le {responseDate}.
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
