import { computed, onMounted, onUnmounted, ref } from 'vue';

export default function useBreakpoint() {
  // 화면 너비를 추적하는 ref 생성
  let windowWidth = ref(window.innerWidth);

  // 화면 크기 변경 시 windowWidth 업데이트 함수
  const onWidthChange = () => (windowWidth.value = window.innerWidth);

  // 컴포넌트가 마운트될 때 리사이즈 이벤트 리스너 추가
  onMounted(() => window.addEventListener('resize', onWidthChange));

  // 컴포넌트가 언마운트될 때 리사이즈 이벤트 리스너 제거
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  // 화면 너비에 따라 'sm', 'md', 'lg' 중 하나를 반환하는 computed 프로퍼티
  const type = computed(() => {
    let size = 'sm';
    if (windowWidth.value > 549 && windowWidth.value < 1200) size = 'md';
    if (windowWidth.value > 1199) size = 'lg';
    return size;
  });

  return {
    type,
  };
}
