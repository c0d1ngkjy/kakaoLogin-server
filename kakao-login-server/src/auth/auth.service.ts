import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export class AuthService {
    async kakaoLogin(options: { code: string; domain: string }): Promise<any> {
        const { code, domain } = options;
        const kakaoKey = 'ebf97db0c2564aa4f0575fd49c0f2e24';
        const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
        const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
        const body = {
          grant_type: 'authorization_code',
          client_id: kakaoKey,
          redirect_uri: `${domain}/kakao-callback`,
          code,
        };
        console.log(body);
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        };
        try {
          const response = await axios({
            method: 'post',
            url: kakaoTokenUrl,
            timeout: 30000,
            headers,
            data: qs.stringify(body),
          });
          console.log(response.data)
          const headerUserInfo = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
             Authorization: 'Bearer ' + response.data.access_token,
          };
          const responseUserInfo = await axios({
            method: 'GET',
            url: kakaoUserInfoUrl,
            timeout: 30000,
            headers: headerUserInfo,
          });
          return responseUserInfo.data;
        } catch (error) {
          console.log(error);
          throw new UnauthorizedException();
        }
      }
}