import { useTheme } from '@/components/theme';
import { Button, Row, Spacer, Text } from '@/components/ui';
import { Screen } from '@/components/ui/screen';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

const heroVideo = require('@/assets/videos/hero-video-mobile.mp4');

export default function OnboardingScreen()
{
  const { height, width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const contentOffset = Math.max(
    height * 0.57 - tokens.spacing.xxxl,
    tokens.spacing.xxxl,
  );
  const player = useVideoPlayer(heroVideo, (videoPlayer) =>
  {
    videoPlayer.loop = true;
    videoPlayer.muted = true;
    videoPlayer.play();
  });

  function openLogin()
  {
    router.replace('/(auth)');
  }

  function openSignUp()
  {
    router.replace('/(auth)/sign-up');
  }

  return (
    <Screen
      background={
        <>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]} />
          <VideoView
            contentFit="cover"
            nativeControls={false}
            player={player}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
            surfaceType="textureView"
            useExoShutter={false}
          />
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]}
          />
          <LinearGradient
            colors={[
              colors.transparent,
              colors.transparent,
              colors.background,
              colors.background,
            ]}
            locations={[0, 0.28, 0.68, 1]}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />
        </>
      }
      contentBackgroundColor={colors.transparent}
    >
      <Spacer size={contentOffset} />
      <Text
        textStyle={{
          color: colors.foreground,
          fontSize: tokens.typography.hero,
          fontWeight: '800',
          lineHeight: tokens.typography.lineHeightHero,
        }}>
        Make every meal worth remembering.
      </Text>
      <Text textStyle={{ color: colors.mutedForeground }}>
        Discover recipes, plan meals, and keep your kitchen ideas organized in
        one simple place.
      </Text>
      <Button
        fullWidth
        height={50}
        label="Get Started"
        onPress={openSignUp}
        borderRadius={0}
      />
      <Row
        alignment="center"
        spacing={tokens.spacing.xs}
        style={{ width: width - tokens.spacing.xl * 2 }}>
        <Spacer flexible />
        <Text textStyle={{ color: colors.mutedForeground }}>
          Already have an account?
        </Text>
        <Button
          contentPadding={0}
          label="Sign in"
          onPress={openLogin}
          variant="link"
        />
        <Spacer flexible />
      </Row>
    </Screen>
  );
}
