import { useState } from 'react';
import { router } from 'expo-router';

import { Logo } from '@/components/custom';
import { Box } from '@/components/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { markOnboardingComplete } from '@/lib/onboarding-storage';

export default function OnboardingScreen()
{
  const [isContinuing, setIsContinuing] = useState(false);

  async function continueToAuth()
  {
    try
    {
      setIsContinuing(true);
      await markOnboardingComplete();
      router.replace('/(auth)');
    } finally
    {
      setIsContinuing(false);
    }
  }

  return (
    <Box className="flex-1 justify-between bg-background-0 px-6 pb-12 pt-20">
      <VStack className="items-center" space="xl">
        <Logo size={180} />
        <VStack className="items-center" space="sm">
          <Heading className="text-center text-typography-950" size="2xl">
            Cook with confidence
          </Heading>
          <Text className="text-center text-typography-600">
            Organize recipes, plan meals, and make every kitchen session easier.
          </Text>
        </VStack>
      </VStack>

      <Button
        accessibilityLabel="Continue to sign in"
        isDisabled={isContinuing}
        onPress={continueToAuth}
        size="xl"
      >
        {isContinuing ? <ButtonSpinner /> : null}
        <ButtonText>Get started</ButtonText>
      </Button>
    </Box>
  );
}
