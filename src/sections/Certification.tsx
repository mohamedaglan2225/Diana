import { useCallback, useEffect, useState } from 'react'
import { AwardIcon, CloseIcon } from '@/components/Icons'
import { useReveal } from '@/hooks/useReveal'
import { siteConfig } from '@/site.config'

export function Certification() {
  const ref = useReveal()
  const [modalOpen, setModalOpen] = useState(false)
  const certificate = siteConfig.certificateAsset
  const close = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalOpen, close])

  const open = () => {
    if (certificate) setModalOpen(true)
  }

  return (
    <section id="certification" className="bg-[#FAF9F6] py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10">
        <div ref={ref} className="reveal text-center mb-10 lg:mb-12">
          <p className="text-xs font-medium tracking-widest text-[#3F6C88] uppercase mb-4">
            Certification
          </p>
          <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] text-[#2F3A40]">
            Qualified to Help You Grow
          </h2>
        </div>

        <div className="bg-white rounded-[24px] border border-[#EFF7FB] shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="p-10 bg-linear-to-br from-[#EFF7FB] to-[#BFD7EA]/25 flex flex-col items-center justify-center text-center min-h-[240px]">
              <span className="w-16 h-16 rounded-full bg-white text-[#4A7C9B] flex items-center justify-center shadow-sm mb-4">
                <AwardIcon />
              </span>
              {certificate ? (
                <button
                  type="button"
                  onClick={open}
                  className="text-sm text-[#3F6C88] font-medium underline underline-offset-4 hover:text-[#2F3A40] transition-colors"
                >
                  Click to view certificate
                </button>
              ) : (
                <p className="text-sm text-[#68767D] max-w-[220px] leading-relaxed">
                  A scan of the original certificate will be added here.
                </p>
              )}
            </div>

            <div className="p-8 lg:p-10">
              <h3 className="text-2xl text-[#2F3A40] mb-2">120-Hour TESOL / TEFL Certificate</h3>
              <p className="text-[#3F6C88] font-medium text-sm mb-1">World TESOL Academy</p>
              <p className="text-xs text-[#68767D] mb-4">Accredited course graduate</p>
              <p className="text-sm text-[#68767D] leading-relaxed mb-6">
                Professional training focused on teaching English to non-native learners in classroom
                and online environments.
              </p>
              <button
                type="button"
                onClick={open}
                disabled={!certificate}
                className="px-5 py-2.5 rounded-full border border-[#6F9FBD] text-[#3F6C88] text-sm font-medium hover:bg-[#EFF7FB] transition-colors duration-200 disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                View Certificate
              </button>
              {!certificate && (
                <p className="text-xs text-[#68767D] mt-3">Certificate document coming soon.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && certificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="120-Hour TESOL / TEFL Certificate"
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              autoFocus
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFF7FB] text-[#68767D] flex items-center justify-center hover:bg-[#BFD7EA]/50 transition-colors"
              onClick={close}
              aria-label="Close certificate"
            >
              <CloseIcon size={12} />
            </button>
            <img
              src={certificate}
              alt="120-Hour TESOL / TEFL Certificate — World TESOL Academy"
              className="w-full rounded-xl"
            />
            <p className="text-center text-sm text-[#68767D] mt-4">
              120-Hour TESOL / TEFL Certificate — World TESOL Academy
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
