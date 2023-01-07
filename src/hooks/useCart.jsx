import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addAndUpdateCart, deleteCart, getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(['cart', uid || ''], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    //취해줄 액션
    (product) => addAndUpdateCart(uid, product),
    {
      onSuccess: () => {
        // 쿼리키 유효성 제거, 다시 업데이트 해줘!
        queryClient.invalidateQueries(['cart', uid]);
      },
    }
  );

  const removeItem = useMutation((id) => deleteCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
