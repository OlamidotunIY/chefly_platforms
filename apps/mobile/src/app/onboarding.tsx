import { useRef, useState } from 'react';
import
{
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  useWindowDimensions,
} from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Logo } from '@/components/custom';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { markOnboardingComplete } from '../lib/onboarding-storage';
import { Center } from '@/components/ui/center';

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  illustration: ImageSource;
};

const PROGRESS_RING_SIZE = 80;
const PROGRESS_RING_CENTER = PROGRESS_RING_SIZE / 2;
const PROGRESS_RING_RADIUS = 36;
const PROGRESS_SEGMENT_GAP = 12;

function pointOnCircle(angle: number)
{
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: PROGRESS_RING_CENTER + PROGRESS_RING_RADIUS * Math.cos(radians),
    y: PROGRESS_RING_CENTER + PROGRESS_RING_RADIUS * Math.sin(radians),
  };
}

function createProgressArc(index: number)
{
  const startAngle = index * 90 + PROGRESS_SEGMENT_GAP / 2;
  const endAngle = (index + 1) * 90 - PROGRESS_SEGMENT_GAP / 2;
  const start = pointOnCircle(startAngle);
  const end = pointOnCircle(endAngle);

  return [
    `M ${start.x} ${start.y}`,
    `A ${PROGRESS_RING_RADIUS} ${PROGRESS_RING_RADIUS} 0 0 1 ${end.x} ${end.y}`,
  ].join(' ');
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'discover',
    title: 'Discover recipes',
    description:
      'Explore delicious recipes thoughtfully matched to your taste, available time, and ingredients. Find fresh ideas for every meal and occasion.',
    illustration: require('@/assets/images/illustration/01_discover_recipes_3d_clay.svg'),
  },
  {
    id: 'learn',
    title: 'Learn from chefs',
    description:
      'Follow clear, step-by-step cooking guidance from experienced chefs. Learn useful techniques, avoid common mistakes, and build confidence with every dish.',
    illustration: require('@/assets/images/illustration/02_learn_from_chefs_3d_clay.svg'),
  },
  {
    id: 'save',
    title: 'Save your favorites',
    description:
      'Save every recipe that catches your eye in one convenient place. Build personal collections and return to your favorites whenever inspiration strikes.',
    illustration: require('@/assets/images/illustration/03_save_favorites_3d_clay.svg'),
  },
  {
    id: 'premium',
    title: 'Unlock more inspiration',
    description:
      'Unlock premium recipes, exclusive chef collections, and richer cooking experiences. Discover more ways to plan, prepare, and enjoy food every day.',
    illustration: require('@/assets/images/illustration/04_unlock_premium_3d_clay.svg'),
  },
];

export default function OnboardingScreen()
{
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<OnboardingStep>>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const isLastStep = activeStep === onboardingSteps.length - 1;
  const artworkHeight = Math.min(Math.max(height * 0.78, 430), 450);

  async function completeOnboarding()
  {
    if (isCompleting)
    {
      return;
    }

    try
    {
      setIsCompleting(true);
      await markOnboardingComplete();
      router.replace('/(auth)');
    } catch (error)
    {
      console.error('Unable to save onboarding state:', error);
      setIsCompleting(false);
    }
  }

  function goToStep(index: number)
  {
    const nextIndex = Math.min(
      Math.max(index, 0),
      onboardingSteps.length - 1,
    );

    listRef.current?.scrollToIndex({
      animated: true,
      index: nextIndex,
    });
    setActiveStep(nextIndex);
  }

  function handleNext()
  {
    if (isLastStep)
    {
      void completeOnboarding();
      return;
    }

    goToStep(activeStep + 1);
  }

  function handleMomentumEnd(
    event: NativeSyntheticEvent<NativeScrollEvent>,
  )
  {
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / width,
    );
    setActiveStep(nextIndex);
  }

  return (
    <Box
      className="flex-1 bg-background-0"
      style={{
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: Math.max(insets.top, 16),
      }}
    >
      <HStack className="items-center justify-between px-6 mt-4">
        <Box className="size-24 items-center justify-center rounded-full">
          <Logo size={150} />
        </Box>
        <Button
          accessibilityLabel="Skip onboarding"
          action="default"
          className="h-14 w-32 rounded-full border border-outline-200  active:bg-background-100"
          hitSlop={12}
          isDisabled={isCompleting}
          onPress={() => void completeOnboarding()}
          size="xl"
          variant="outline"
        >
          <ButtonText className="text-2xl font-semibold text-typography-900">
            Skip
          </ButtonText>
        </Button>
      </HStack>

      <FlatList
        ref={listRef}
        data={onboardingSteps}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleMomentumEnd}
        pagingEnabled
        renderItem={({ item }) => (
          <VStack style={{ width }}>
            <Box
              className="items-center justify-center px-2"
              style={{ height: artworkHeight }}
            >
              <Image
                accessibilityLabel={item.title}
                contentFit="contain"
                source={item.illustration}
                style={{
                  width: width - 8,
                  height: artworkHeight,
                }}
              />
            </Box>

            <VStack className="px-7 pt-2" space="sm">
              <Heading
                className="text-typography-950"
                size="3xl"
              >
                {item.title}
              </Heading>
              <Text
                className="mt-3 max-w-md leading-7 text-typography-600"
                size="xl"
              >
                {item.description}
              </Text>
            </VStack>
          </VStack>
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      />

      <HStack className="items-center justify-between px-7 pt-4">
        <HStack
          accessibilityLabel={`Step ${activeStep + 1} of ${onboardingSteps.length}`}
          className="h-10 items-center"
          space="sm"
        >
          {onboardingSteps.map((step, index) => (
            <Box
              className={
                index === activeStep
                  ? 'h-2.5 w-7 rounded-full bg-primary-500'
                  : 'size-2.5 rounded-full bg-outline-200'
              }
              key={step.id}
            />
          ))}
        </HStack>

        <HStack className="items-center" space="lg">
          {activeStep > 0 ? (
            <Button
              accessibilityLabel="Previous step"
              action="default"
              className="rounded-full bg-background-100 p-0 active:bg-background-200 w-14 h-14 items-center justify-center"
              onPress={() => goToStep(activeStep - 1)}
            >
              <SymbolView
                name={{
                  android: 'arrow_back',
                  ios: 'arrow.left',
                  web: 'arrow_back',
                }}
                size={22}
                tintColor="#262627"
              />
            </Button>
          ) : null}

          <Box className="size-20 items-center justify-center relative">
            <Box className="absolute inset-0">
              <Svg
                accessibilityLabel={`Onboarding progress: step ${activeStep + 1} of ${onboardingSteps.length}`}
                height={PROGRESS_RING_SIZE}
                width={PROGRESS_RING_SIZE}
              >
                {onboardingSteps.map((step, index) => (
                  <Path
                    d={createProgressArc(index)}
                    fill="none"
                    key={step.id}
                    stroke={index <= activeStep ? '#00dbc0' : '#3f3f46'}
                    strokeLinecap="round"
                    strokeWidth={3.5}
                  />
                ))}
              </Svg>
            </Box>

            <Box
              className="size-16 rounded-full bg-background-0 p-1.5"
              style={{
                top: '50%',
                left: '50%',
                transform: [
                  { translateX: -30 },
                  { translateY: -30 },
                ],
              }}

            >
              <Center className='h-full w-full '>
                <Button
                  accessibilityLabel={isLastStep ? 'Complete onboarding' : 'Next step'}
                  action="default"
                  className="bg-primary-500 w-full h-full rounded-full p-0 active:bg-primary-600"
                  isDisabled={isCompleting}
                  onPress={handleNext}
                >
                  <SymbolView
                    name={{
                      android: isLastStep ? 'check' : 'arrow_forward',
                      ios: isLastStep ? 'checkmark' : 'arrow.right',
                      web: isLastStep ? 'check' : 'arrow_forward',
                    }}
                    size={22}
                    tintColor="#000"
                  />
                </Button>
              </Center>
            </Box>
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
}
