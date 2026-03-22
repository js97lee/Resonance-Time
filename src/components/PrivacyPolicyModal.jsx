import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  const { lang } = useLang()
  const tr = t[lang]

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content privacy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{tr.footerPrivacy}</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        <div className="privacy-content">
          {lang === 'ko' ? (
            <>
              <p className="privacy-updated">시행일: 2026년 4월 1일</p>

              <h4>1. 사전등록 정보의 수집 및 이용 목적</h4>
              <p>본 전시·포럼 사전등록 서비스는 「공명의 시간」 전시 및 포럼 참여 신청을 위한 목적으로 개인정보를 수집·이용합니다.</p>

              <h4>2. 수집하는 개인정보 항목</h4>
              <ul>
                <li>필수: 성함, 이메일</li>
                <li>선택: 연락처, 조직/소속, 관심 분야, 메모</li>
              </ul>

              <h4>3. 개인정보의 보유 및 이용 기간</h4>
              <p>전시·포럼 종료일(2026년 4월 11일)로부터 3개월 경과 후 파기합니다. 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>

              <h4>4. 개인정보의 제3자 제공</h4>
              <p>수집된 개인정보는 전시·포럼 운영 목적으로만 사용되며, 동의 없이 제3자에게 제공하지 않습니다.</p>

              <h4>5. 이용자 권리</h4>
              <p>이용자는 언제든지 수집된 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있으며, studio.realday@gmail.com으로 문의해 주시기 바랍니다.</p>

              <h4>6. 개인정보 처리방침 변경</h4>
              <p>본 방침은 법령 및 방침 변경 시 수정될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.</p>

              <p className="privacy-contact">개인정보 관련 문의: studio.realday@gmail.com</p>
            </>
          ) : (
            <>
              <p className="privacy-updated">Effective: April 1, 2026</p>

              <h4>1. Purpose of Collection and Use of Pre-registration Information</h4>
              <p>This pre-registration service collects and uses personal information for the purpose of applying for the "Time of Resonance" exhibition and forum participation.</p>

              <h4>2. Personal Information Collected</h4>
              <ul>
                <li>Required: Name, Email</li>
                <li>Optional: Phone, Organization, Field of interest, Memo</li>
              </ul>

              <h4>3. Retention and Use Period</h4>
              <p>Personal information is destroyed three months after the end of the exhibition/forum (April 11, 2026). However, if retention is required by law, it will be kept for the specified period.</p>

              <h4>4. Third-Party Provision</h4>
              <p>Collected personal information is used only for exhibition and forum operation purposes and is not provided to third parties without consent.</p>

              <h4>5. User Rights</h4>
              <p>Users may request access, correction, or deletion of their personal information at any time by contacting studio.realday@gmail.com.</p>

              <h4>6. Policy Changes</h4>
              <p>This policy may be amended in accordance with laws and policy changes. Any updates will be announced on the website.</p>

              <p className="privacy-contact">Privacy inquiries: studio.realday@gmail.com</p>
            </>
          )}
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-primary" onClick={onClose}>
            {tr.mapModalClose}
          </button>
        </div>
      </div>
    </div>
  )
}
